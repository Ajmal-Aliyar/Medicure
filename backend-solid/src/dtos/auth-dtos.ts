import { AUTH_MESSAGES } from "@/constants/messages";
import { IAuthResponseUser } from "@/interfaces";
import { IsEmail, IsString, IsOptional, MinLength, MaxLength, Matches, IsIn } from "class-validator";

export class RegisterDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsString()
  fullName!: string;

  @IsString()
  @MinLength(10)
  @MaxLength(10)
  @Matches(/^\d+$/, { message: AUTH_MESSAGES.VALIDATION.MOBILE_INVALID })
  mobile!: string;
  
 @IsString()
  @IsIn(['patient', 'doctor'], { message: AUTH_MESSAGES.VALIDATION.ROLE_INVALID })
  role!: 'patient' | 'doctor';
}

export class LoginDto {
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;

  @IsString()
  @IsIn(['patient', 'doctor'], { message: AUTH_MESSAGES.VALIDATION.ROLE_INVALID })
  role!: 'patient' | 'doctor';
}

export class AuthResponse {
  accessToken!: string;
  refreshToken!: string;
  user!: IAuthResponseUser;
}

export class CreateUserDto {
  @IsEmail()
  email!: string;

  @MinLength(6)
  password!: string;

  @IsString()
  fullName?: string;

  @IsString()
  @MinLength(10)
  @MaxLength(10)
  @Matches(/^\d+$/, { message: AUTH_MESSAGES.VALIDATION.MOBILE_INVALID })
  mobile!: string;
}
