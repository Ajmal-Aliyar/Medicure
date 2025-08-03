export interface IEmailService {
  sendOtpEmail(to: string, otp: string): Promise<void>
}
