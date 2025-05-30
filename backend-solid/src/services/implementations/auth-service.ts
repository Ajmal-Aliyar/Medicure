import { inject, injectable } from "inversify";
import { RegisterDto, LoginDto, AuthResponse } from "@/dtos";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from "@/errors";
import {
  IAuthService,
  IOtpService,
} from "@/services";
import { IDoctorRepository, IPatientRepository } from "@/repositories";
import  { TYPES }  from "@/di/types";
import { AUTH_MESSAGES, GLOBAL_MESSAGES } from "@/constants";
import { mapToUserDto } from "@/mappers";
import { IAuthResponseUser, ICacheService, IEmailService, IPasswordHasher, IRole } from "@/interfaces";
import { ITokenService } from "@/interfaces/service/i-token-service";


@injectable()
export class AuthService implements IAuthService {
  constructor(
    @inject(TYPES.PatientRepository)
    private readonly patientRepo: IPatientRepository,
    @inject(TYPES.DoctorRepository)
    private readonly doctorRepo: IDoctorRepository,
    @inject(TYPES.TokenService) private readonly tokenService: ITokenService,
    @inject(TYPES.EmailService) private readonly emailService: IEmailService,
    @inject(TYPES.PasswordHasher)
    private readonly passwordHasher: IPasswordHasher,
    @inject(TYPES.OtpService) private readonly otpService: IOtpService,
    @inject(TYPES.CacheService) private readonly cacheService: ICacheService
  ) {}

  async register(data: RegisterDto): Promise<void> {
    console.log("RM-LOG", "Register arguments", data);

    const role: "doctor" | "patient" = data.role;
    const userRepo = role === "doctor" ? this.doctorRepo : this.patientRepo;

    const existing = await userRepo.findByEmail(data.email);
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

    const role: "doctor" | "patient" = data.role;
    const userRepo = role === "doctor" ? this.doctorRepo : this.patientRepo;

    const user = await userRepo.findByEmail(data.email);
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

    const accessToken = this.tokenService.generateAccessToken({
      id: user.id,
      role,
    });
    const refreshToken = this.tokenService.generateRefreshToken({
      id: user.id,
      role,
    });
    await this.cacheService.set(user.id, refreshToken);

    return { user: mapToUserDto( user, role ), accessToken, refreshToken };
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

    const userRepo = role === "doctor" ? this.doctorRepo : this.patientRepo;

    const user = await userRepo.findById(userId);
    if (!user) {
      throw new NotFoundError(AUTH_MESSAGES.ERROR.USER_NOT_FOUND);
    }
    const accessToken = this.tokenService.generateAccessToken({ id: user.id });
    const newRefreshToken = this.tokenService.generateRefreshToken({
      id: user.id,
    });
    await this.cacheService.set(user.id, newRefreshToken);

    return { user: mapToUserDto( user, role ), accessToken, refreshToken: newRefreshToken };
  }

  async verifyOtpAndRegister(
    email: string,
    otp: string
  ): Promise<AuthResponse> {
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

    const role: "patient" | "doctor" = cachedData.role;
    const userRepo = role === "doctor" ? this.doctorRepo : this.patientRepo;

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

    const accessToken = this.tokenService.generateAccessToken({
      id: createdUser.id, 
      role
    });
    const refreshToken = this.tokenService.generateRefreshToken({
      id: createdUser.id,
      role
    });
    await this.cacheService.set(createdUser.id, refreshToken);

    return {
      accessToken,
      refreshToken,
      user: mapToUserDto(createdUser, role),
    };
  }

  async logout(userId: string): Promise<void> {
    await this.cacheService.del(userId);
  }

  async me(userId: string, role: IRole ): Promise<IAuthResponseUser> {
    const userRepo = role === "doctor" ? this.doctorRepo : this.patientRepo;
    const user = await userRepo.findById(userId);
    if (!user) {
      throw new NotFoundError(AUTH_MESSAGES.ERROR.USER_NOT_FOUND);
    }
    return mapToUserDto(user, role)
  }
}
