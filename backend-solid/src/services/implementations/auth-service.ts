import { inject, injectable } from "inversify";
import { RegisterDto, LoginDto, AuthResponse } from "@/dtos";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from "@/errors";
import { IAuthService } from "@/services";
import {
  IAdminRepository,
  IBaseRepository,
  IDoctorRepository,
  IPatientRepository,
} from "@/repositories";
import { TYPES } from "@/di/types";
import { AUTH_MESSAGES, GLOBAL_MESSAGES } from "@/constants";
import { mapToUserDto } from "@/mappers";
import {
  IAuthResponseUser,
  ICacheService,
  IEmailService,
  IOtpService,
  IPasswordHasher,
  IRole,
  ITokenService,
} from "@/interfaces";
import { IDoctor, IPatient } from "@/models";
import { IAdmin } from "@/models/interfaces/admin";

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
    @inject(TYPES.CacheService) private readonly cacheService: ICacheService
  ) {}

  async register(data: RegisterDto): Promise<void> {
    console.log("RM-LOG", "Register arguments", data);
    const email = data.email.trim().toLowerCase();
    const role: IRole = data.role;
    const userRepo = this.getUserRepo(role);
    const existing = await userRepo.findOne({ email });
    if (existing) {
      throw new ConflictError(AUTH_MESSAGES.ERROR.EMAIL_ALREADY_EXISTS);
    }
    const hashedPassword = await this.passwordHasher.hash(data.password);
    const otp = this.otpService.generateOtp();
    console.log("RM-LOG", "OTP", otp);
    await this.otpService.storeOtp(data.email, otp);
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
    console.log("RM-LOG", "login arguments", data);
    const email = data.email.trim().toLowerCase();
    const role: IRole = data.role;
    const userRepo = this.getRepo(role);
    const user = await userRepo.findOne({ email });
    if (!user) {
      throw new UnauthorizedError(AUTH_MESSAGES.ERROR.INVALID_CREDENTIALS);
    }

    const isPasswordValid = await this.passwordHasher.compare(
      data.password,
      user.personal.password
    );
    if (!isPasswordValid) {
      throw new UnauthorizedError(AUTH_MESSAGES.ERROR.INVALID_CREDENTIALS);
    }

    return this.buildAuthResponse(user, role);
  }

  async refreshToken(token: string): Promise<AuthResponse> {
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
      throw new UnauthorizedError(AUTH_MESSAGES.ERROR.OTP_INVALID_OR_EXPIRED);
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

    const role: IRole = cachedData.role;
    const userRepo = this.getUserRepo(role);
    const existingUser = await userRepo.findOne({ email });
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
    return mapToUserDto(user, role);
  }

  private getRepo(role: IRole): IBaseRepository<IDoctor | IPatient | IAdmin> {
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

  // async findUserByEmail(role: IRole, email: string): Promise<IPatient | IDoctor | IAdmin | null> {
  //   switch (role) {
  //     case "admin":
  //       return this.adminRepo.findByEmail(email);
  //     case "doctor":
  //       return this.doctorRepo.findByEmail(email);
  //     case "patient":
  //       return this.patientRepo.findByEmail(email);
  //     default:
  //       throw new BadRequestError(AUTH_MESSAGES.ERROR.INVALID_USER);
  //   }
  // }

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
      user: mapToUserDto(user, role),
      accessToken,
      refreshToken,
    };
  }
}
