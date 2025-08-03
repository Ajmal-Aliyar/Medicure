import nodemailer from "nodemailer";
import { env } from "./env.config";

export const createTransporter = () => {
  return nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: env.EMAIL_USER,
      pass: env.EMAIL_PASS,
    },
  });
};
