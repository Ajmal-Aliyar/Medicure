import { inject, injectable } from "inversify";
import { RegisterDto, LoginDto, AuthResponseDTO, AuthResponseUserDTO } from "@/dtos";
import {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from "@/errors";
import { IAuthService, IWalletService } from "@/services";
import {
  IAdminRepository,
  IDoctorRepository,
  IPatientRepository,
} from "@/repositories";
import { TYPES } from "@/di/types";
import { AUTH_MESSAGES, GLOBAL_MESSAGES } from "@/constants";
import {
  ICacheService,
  IEmailService,
  IOtpService,
  IPasswordHasher,
  IRole,
  ITokenService,
} from "@/interfaces";
import { IDoctor, IPatient, IAdmin } from "@/models";
import { AuthMapper } from "@/mappers";

@injectable()
export class AuthService implements IAuthService {
  constructor(
    @inject(TYPES.PatientRepository)
    private readonly _patientRepo: IPatientRepository,
    @inject(TYPES.DoctorRepository)
    private readonly _doctorRepo: IDoctorRepository,
    @inject(TYPES.AdminRepository)
    private readonly _adminRepo: IAdminRepository,
    @inject(TYPES.TokenService) private readonly _tokenService: ITokenService,
    @inject(TYPES.EmailService) private readonly _emailService: IEmailService,
    @inject(TYPES.PasswordHasher)
    private readonly _passwordHasher: IPasswordHasher,
    @inject(TYPES.OtpService) private readonly _otpService: IOtpService,
    @inject(TYPES.CacheService) private readonly _cacheService: ICacheService,
    @inject(TYPES.WalletService) private readonly _walletService: IWalletService
  ) {}

  async register(data: RegisterDto): Promise<void> {
    const role: IRole = data.role;
    const email = data.email.trim().toLowerCase();
    const userRepo = this.getUserRepo(role);
    const existing = await userRepo.findByEmail(email);
    if (existing) {
      throw new ConflictError(AUTH_MESSAGES.ERROR.EMAIL_ALREADY_EXISTS);
    }
    const hashedPassword = await this._passwordHasher.hash(data.password);
    const otp = this._otpService.generateOtp();
    console.log("RM-LOG", "OTP", otp);
    await this._otpService.storeOtp(email, otp);
    await this._cacheService.set(
      data.email,
      JSON.stringify({
        ...data,
        password: hashedPassword,
        otp,
      }),
      900
    );

    await this._emailService.sendOtpEmail(data.email, otp);
  }

  async login(data: LoginDto): Promise<AuthResponseDTO> {
    const role: IRole = data.role;
    const email = data.email.trim().toLowerCase();
    const userRepo = this.getRepo(role);
    const user: any = await userRepo.findByEmail(email);
    
    if (!user) {
      throw new NotFoundError(AUTH_MESSAGES.ERROR.INVALID_CREDENTIALS);
    }

    if (role === 'doctor' && user?.status?.accountStatus?.isBlocked) {
      throw new ForbiddenError("Doctor is blocked by admin.")
    }
    if (role === 'patient' && user?.status?.isBlocked) {
      throw new ForbiddenError("Patient is blocked by admin.")
    }

    const isPasswordValid = await this._passwordHasher.compare(
      data.password,
      user.personal.password
    );
    if (!isPasswordValid) {
      throw new BadRequestError(AUTH_MESSAGES.ERROR.INVALID_CREDENTIALS);
    }
    
    return this.buildAuthResponse(user, role);
  }

  async resendOtp(email: string): Promise<void> {
    email = email.trim().toLowerCase();

    const cachedDataString = await this._cacheService.get(email);
    if (!cachedDataString) {
      throw new BadRequestError(AUTH_MESSAGES.ERROR.NO_REGISTRATION_DATA);
    }

    let cachedData: any;
    try {
      cachedData = JSON.parse(cachedDataString);
    } catch {
      throw new BadRequestError(AUTH_MESSAGES.ERROR.CORRUPTED_CACHE_DATA);
    }

    const otp = this._otpService.generateOtp();
    console.log("RM-LOG", "Resend OTP", otp);
    await this._otpService.storeOtp(email, otp);
    await this._cacheService.set(
      email,
      JSON.stringify({
        ...cachedData,
        otp,
      }),
      900
    );
    await this._emailService.sendOtpEmail(email, otp);
  }

  async refreshToken(token: string): Promise<AuthResponseDTO> {
    if (!token) {
      throw new UnauthorizedError(GLOBAL_MESSAGES.ERROR.INVALID_REFRESH_TOKEN);
    }
    const payload = this._tokenService.verifyRefreshToken(token);

    if (typeof payload === "string" || !payload.id) {
      throw new UnauthorizedError(GLOBAL_MESSAGES.ERROR.INVALID_REFRESH_TOKEN);
    }

    const { id: userId, role } = payload;

    const validToken = await this._cacheService.get(userId);
    if (!validToken || token !== validToken) {
      throw new UnauthorizedError(GLOBAL_MESSAGES.ERROR.INVALID_REFRESH_TOKEN);
    }

    const userRepo = this.getRepo(role);

    const user = await userRepo.findById(userId);
    if (!user) {
      throw new NotFoundError(AUTH_MESSAGES.ERROR.USER_NOT_FOUND);
    }

    return this.buildAuthResponse(user, role);
  }

  async verifyOtpAndRegister(
    email: string,
    otp: string
  ): Promise<AuthResponseDTO> {
    email = email.trim().toLowerCase();
    const isValidOtp = await this._otpService.verifyOtp(email, otp);
    if (!isValidOtp) {
      throw new BadRequestError(AUTH_MESSAGES.ERROR.OTP_INVALID_OR_EXPIRED);
    }

    const cachedDataString = await this._cacheService.get(email);
    if (!cachedDataString) {
      throw new BadRequestError(AUTH_MESSAGES.ERROR.NO_REGISTRATION_DATA);
    }

    let cachedData;
    try {
      cachedData = JSON.parse(cachedDataString);
    } catch {
      throw new BadRequestError(AUTH_MESSAGES.ERROR.CORRUPTED_CACHE_DATA);
    }

    const role: "patient" | "doctor" = cachedData.role;
    const userRepo = this.getUserRepo(role);
    const existingUser = await userRepo.findByEmail(email);
    if (existingUser) {
      throw new ConflictError(AUTH_MESSAGES.ERROR.USER_ALREADY_EXISTS);
    }

    const createdUser = await userRepo.register({
      fullName: cachedData.fullName,
      email: cachedData.email,
      password: cachedData.password,
      mobile: cachedData.mobile,
    });

    await this._otpService.deleteOtp(email);
    await this._cacheService.del(email);
    await this._walletService.createWallet(String(createdUser.id), role);

    return this.buildAuthResponse(createdUser, role);
  }

  async logout(userId: string): Promise<void> {
    await this._cacheService.del(userId);
  }

  async me(userId: string, role: IRole): Promise<AuthResponseUserDTO> {
    const userRepo = this.getRepo(role);
    const user = await userRepo.findById(userId);
    if (!user) {
      throw new NotFoundError(AUTH_MESSAGES.ERROR.USER_NOT_FOUND);
    }
    return AuthMapper.toUserDto(user, role);
  }

  private getRepo(
    role: IRole
  ): IPatientRepository | IDoctorRepository | IAdminRepository {
    if (role === "patient") return this._patientRepo;
    if (role === "doctor") return this._doctorRepo;
    if (role === "admin") return this._adminRepo;
    throw new BadRequestError(AUTH_MESSAGES.ERROR.INVALID_USER);
  }

  private getUserRepo(role: IRole): IPatientRepository | IDoctorRepository {
    if (role === "patient") return this._patientRepo;
    if (role === "doctor") return this._doctorRepo;
    throw new BadRequestError(AUTH_MESSAGES.ERROR.INVALID_USER);
  }

  private async buildAuthResponse(
    user: Partial<IDoctor> | Partial<IPatient> | Partial<IAdmin>,
    role: IRole
  ): Promise<AuthResponseDTO> {
    if (!user._id) throw new BadRequestError();
    const accessToken = this._tokenService.generateAccessToken({
      id: user._id,
      role,
    });
    const refreshToken = this._tokenService.generateRefreshToken({
      id: user._id,
      role,
    });
    await this._cacheService.set(user._id.toString(), refreshToken);

    return {
      user: AuthMapper.toUserDto(user, role),
      accessToken,
      refreshToken,
    };
  }
}
