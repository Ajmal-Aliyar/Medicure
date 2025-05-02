import {
  setRedisData,
  getRedisData,
  deleteRedisData,
} from "../../utils/redisUtil";
import {
  checkBruteForce,
  deleteBruteForce,
} from "../../utils/BruteForceHandler";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/tokenUtil";
import { PatientRepository } from "../../repositories/implementations/patientRepository";
import { hashPassword, verifyPassword } from "../../utils/passwordUtil";
import { DoctorRepository } from "../../repositories/implementations/doctorRepository";
import { sendOtpToEmail } from "../../utils/otpUtil";
import { AdminRepository } from "../../repositories/implementations/adminRepository";
import { WalletRepository } from "../../repositories/implementations/walletRepository";
import { v4 as uuidv4 } from "uuid";

export interface authorizedUserResponse {
  accessToken: string;
  refreshToken: string;
  id: string;
}
const patientRepository = new PatientRepository();
const doctorRepository = new DoctorRepository();
const adminRepository = new AdminRepository();
const walletRepository = new WalletRepository();

export class AuthService {
  async userInfo(_id: string, role: string) {
    try {
      const repository =
        role === "admin"
          ? adminRepository
          : role === "doctor"
          ? doctorRepository
          : patientRepository;
      const userData = await repository.findByID(_id);
      // const wallet = walletRepository.createWallet(_id, role)

      if (!userData) {
        throw new Error(`User with ID: ${_id} not found`);
      }

      const isDoctor = (data): data is { isApproved: boolean } =>
        role === "doctor" && "isApproved" in data;

      return {
        _id: userData._id.toString(),
        fullName: userData.fullName,
        email: userData.email,
        ...(isDoctor(userData)
          ? { isApproved: userData.isApproved ?? false }
          : {}),
        role,
      };
    } catch (error) {
      console.error(`Error fetching user info: ${(error as Error).message}`);
      throw new Error("Failed to retrieve user information");
    }
  }

  async signUp(
    fullname: string,
    email: string,
    number: number,
    password: string,
    role: string
  ) {
    try {
      const repository =
        role === "doctor" ? doctorRepository : patientRepository;
      const existingAccount = await repository.findByEmail(email);
      if (existingAccount) {
        throw new Error(`${role} already exists`);
      }
      const otp = await sendOtpToEmail(email);
      if (!otp) {
        throw new Error("OTP not sent");
      }
      await setRedisData(`otp-${email}`, otp.toString(), 60);
      const hashedPassword = await hashPassword(password);
      await setRedisData(
        `${email}`,
        JSON.stringify({ fullname, email, number, hashedPassword, role }),
        600
      );
      return "Please check your inbox and verify your email address to complete the registration process";
    } catch (error) {
      console.error("Error during signup:", error);
      throw new Error(`Signup failed: ${error}`);
    }
  }

  async signIn(
    email: string,
    password: string,
    role: string
  ): Promise<authorizedUserResponse> {
    try {
      // await checkBruteForce(email, 5, 600)
      const repository =
        role === "doctor" ? doctorRepository : patientRepository;
      const user = await repository.findByEmail(email);
      if (!user) {
        throw new Error("Invalid email or password");
      }
      const isPasswordValid = await verifyPassword(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid email or password");
      }
      // await deleteBruteForce(email);
      const payload = {
        _id: user._id.toString(),
        role,
        ...(role === "doctor" && "isApproved" in user
          ? { isApproved: user.isApproved }
          : {}),
      };

      const accessToken = generateAccessToken(payload);
      const refreshToken = generateRefreshToken(payload);
      return { accessToken, refreshToken, id: user._id.toString() };
    } catch (error) {
      console.error("Error during sign-in:", error);
      throw new Error(
        `Sign-in failed: ${error instanceof Error ? error : "Unknown error"}`
      );
    }
  }

  async googleAuth({
    fullName,
    email,
    profileImage,
  }): Promise<authorizedUserResponse> {
    const user = await patientRepository.findByEmail(email);
    let id: string = "";
    if (!user) {
      const patient = await patientRepository.createAuthUser({
        fullName,
        email,
        profileImage,
        password: uuidv4(),
      });
      if (!patient) {
        throw new Error(
          "Registration failed: We encountered an issue while creating your account."
        );
      }
      id = patient._id.toString();
    } else {
      id = user._id.toString();
    }

    const payload = {
      _id:id,
      role: "user",
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
    return { accessToken, refreshToken, id };
  }

  async changePassword(
    email: string,
    password: string,
    role: string
  ): Promise<boolean> {
    try {
      const hashedPassword = await hashPassword(password);
      const repository =
        role === "doctor" ? doctorRepository : patientRepository;
      const result = await repository.changePassword(email, hashedPassword);
      if (result.modifiedCount === 0) {
        throw new Error("No user found with this email.");
      }
      return true;
    } catch (error: unknown) {
      throw error;
    }
  }

  async sendOTP(email: string) {
    try {
      const otp = await sendOtpToEmail(email);
      if (otp) {
        await setRedisData(`otp-${email}`, otp.toString(), 60);
      } else {
        throw new Error("OTP not sent");
      }
    } catch (error: unknown) {
      console.error("Error during resend otp :", error);
      throw new Error(`Resend otp failed: ${error}`);
    }
  }

  async verifyOTPAndRegister(
    email: string,
    otp: string
  ): Promise<authorizedUserResponse> {
    try {
      await checkBruteForce(email, 30, 1800);
      const validOtp = await getRedisData(`otp-${email}`);

      if (!validOtp) {
        throw new Error(
          "The OTP has either expired or is invalid. Please request a new one."
        );
      }
      if (validOtp !== otp) {
        throw new Error("The OTP you entered is incorrect. Please try again.");
      }

      await deleteRedisData(`otp-${email}`);
      await deleteBruteForce(email);

      const userData = JSON.parse(await getRedisData(email));

      let id: string;
      if (userData.role === "doctor") {
        const doctor = await doctorRepository.createDoctor({
          fullName: userData.fullname,
          email: userData.email,
          phone: userData.number,
          password: userData.hashedPassword,
        });
        if (!doctor) {
          throw new Error(
            "Registration failed: We encountered an issue while creating your account."
          );
        }
        id = doctor._id.toString();
      } else {
        const patient = await patientRepository.createUser({
          fullName: userData.fullname,
          email: userData.email,
          phone: userData.number,
          password: userData.hashedPassword,
        });
        if (!patient) {
          throw new Error(
            "Registration failed: We encountered an issue while creating your account."
          );
        }
        id = patient._id.toString();
      }

      const payload = { _id:id, role: userData.role };
      const wallet = walletRepository.createWallet( id, userData.role);
      const accessToken = generateAccessToken(payload);
      const refreshToken = generateRefreshToken(payload);

      return { accessToken, refreshToken, id };
    } catch (error: unknown) {
      throw error;
    }
  }

  async verifyOTP(email: string, otp: string): Promise<boolean> {
    await checkBruteForce(email, 30, 1800);
    const validOtp = await getRedisData(`otp-${email}`);
    if (!validOtp) {
      throw new Error(
        "The OTP has either expired or is invalid. Please request a new one."
      );
    }
    if (validOtp !== otp) {
      throw new Error("The OTP you entered is incorrect. Please try again.");
    }
    await deleteRedisData(`otp-${email}`);
    await deleteBruteForce(email);
    return true;
  }
}
