import { inject, injectable } from "inversify";
import { RegisterDto, LoginDto, AuthResponse } from "@/dtos";
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
  IAuthResponseUser,
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
    private readonly patientRepo: IPatientRepository,
    @inject(TYPES.DoctorRepository)
    private readonly doctorRepo: IDoctorRepository,
    @inject(TYPES.AdminRepository)
    private readonly adminRepo: IAdminRepository,
    @inject(TYPES.TokenService) private readonly tokenService: ITokenService,
    @inject(TYPES.EmailService) private readonly emailService: IEmailService,
    @inject(TYPES.PasswordHasher)
    private readonly passwordHasher: IPasswordHasher,
    @inject(TYPES.OtpService) private readonly otpService: IOtpService,
    @inject(TYPES.CacheService) private readonly cacheService: ICacheService,
    @inject(TYPES.WalletService) private readonly walletService: IWalletService
  ) {}

  async register(data: RegisterDto): Promise<void> {
    const role: IRole = data.role;
    const email = data.email.trim().toLowerCase();
    const userRepo = this.getUserRepo(role);
    const existing = await userRepo.findByEmail(email);
    if (existing) {
      throw new ConflictError(AUTH_MESSAGES.ERROR.EMAIL_ALREADY_EXISTS);
    }
    const hashedPassword = await this.passwordHasher.hash(data.password);
    const otp = this.otpService.generateOtp();
    console.log("RM-LOG", "OTP", otp);
    await this.otpService.storeOtp(email, otp);
    await this.cacheService.set(
      data.email,
      JSON.stringify({
        ...data,
        password: hashedPassword,
        otp,
      }),
      900
    );

    await this.emailService.sendOtpEmail(data.email, otp);
  }

  async login(data: LoginDto): Promise<AuthResponse> {
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

    const isPasswordValid = await this.passwordHasher.compare(
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

    const cachedDataString = await this.cacheService.get(email);
    if (!cachedDataString) {
      throw new BadRequestError(AUTH_MESSAGES.ERROR.NO_REGISTRATION_DATA);
    }

    let cachedData: any;
    try {
      cachedData = JSON.parse(cachedDataString);
    } catch {
      throw new BadRequestError(AUTH_MESSAGES.ERROR.CORRUPTED_CACHE_DATA);
    }

    const otp = this.otpService.generateOtp();
    console.log("RM-LOG", "Resend OTP", otp);
    await this.otpService.storeOtp(email, otp);
    await this.cacheService.set(
      email,
      JSON.stringify({
        ...cachedData,
        otp,
      }),
      900
    );
    await this.emailService.sendOtpEmail(email, otp);
  }

  async refreshToken(token: string): Promise<AuthResponse> {
    if (!token) {
      throw new UnauthorizedError(GLOBAL_MESSAGES.ERROR.INVALID_REFRESH_TOKEN);
    }
    const payload = this.tokenService.verifyRefreshToken(token);

    if (typeof payload === "string" || !payload.id) {
      throw new UnauthorizedError(GLOBAL_MESSAGES.ERROR.INVALID_REFRESH_TOKEN);
    }

    const { id: userId, role } = payload;

    const validToken = await this.cacheService.get(userId);
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
  ): Promise<AuthResponse> {
    email = email.trim().toLowerCase();
    const isValidOtp = await this.otpService.verifyOtp(email, otp);
    if (!isValidOtp) {
      throw new BadRequestError(AUTH_MESSAGES.ERROR.OTP_INVALID_OR_EXPIRED);
    }

    const cachedDataString = await this.cacheService.get(email);
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

    await this.otpService.deleteOtp(email);
    await this.cacheService.del(email);
    await this.walletService.createWallet(String(createdUser.id), role);

    return this.buildAuthResponse(createdUser, role);
  }

  async logout(userId: string): Promise<void> {
    await this.cacheService.del(userId);
  }

  async me(userId: string, role: IRole): Promise<IAuthResponseUser> {
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
    if (role === "patient") return this.patientRepo;
    if (role === "doctor") return this.doctorRepo;
    if (role === "admin") return this.adminRepo;
    throw new BadRequestError(AUTH_MESSAGES.ERROR.INVALID_USER);
  }

  private getUserRepo(role: IRole): IPatientRepository | IDoctorRepository {
    if (role === "patient") return this.patientRepo;
    if (role === "doctor") return this.doctorRepo;
    throw new BadRequestError(AUTH_MESSAGES.ERROR.INVALID_USER);
  }

  private async buildAuthResponse(
    user: Partial<IDoctor> | Partial<IPatient> | Partial<IAdmin>,
    role: IRole
  ): Promise<AuthResponse> {
    if (!user._id) throw new BadRequestError();
    const accessToken = this.tokenService.generateAccessToken({
      id: user._id,
      role,
    });
    const refreshToken = this.tokenService.generateRefreshToken({
      id: user._id,
      role,
    });
    await this.cacheService.set(user._id.toString(), refreshToken);

    return {
      user: AuthMapper.toUserDto(user, role),
      accessToken,
      refreshToken,
    };
  }
}
