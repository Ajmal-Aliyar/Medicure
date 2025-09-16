import { inject, injectable } from "inversify";
import nodemailer from "nodemailer";
import {TYPES} from "@/di/types";
import { IEmailService } from "@/interfaces";

@injectable()
export class EmailService implements IEmailService {
  constructor(
    @inject(TYPES.EmailTransporter) private _transporter: nodemailer.Transporter
  ) {}

  async sendOtpEmail(to: string, otp: string): Promise<void> {
    const htmlContent = `<p>Your OTP is: <strong>${otp}</strong>. It expires in 5 minutes.</p>`;
    await this._transporter.sendMail({
      to,
      subject: "Your OTP Code",
      html: htmlContent,
    });
  }
}
