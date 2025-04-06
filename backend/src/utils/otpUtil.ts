import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

export const sendOtpToEmail = async (email: string): Promise<number> => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log(otp,'- otp')
    const mailOptions = {
        from: process.env.MAIL_USER,
        to: email,
        subject: 'Your OTP for Signup',
        text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log('OTP sent successfully');
        return otp;
    } catch (error) {
        console.error('Error sending OTP:', error);
        throw new Error('Failed to send OTP. Please try again later.');
    }
}

export function generateId(): string {
    const prefix = 'txn';
    const timestamp = Date.now(); // current timestamp in ms
    const randomPart = Math.floor(1000 + Math.random() * 9000); // random 4-digit number
    return `${prefix}-${timestamp}-${randomPart}`;
  }