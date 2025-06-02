import nodemailer from "nodemailer";
import { Container } from "inversify";
import { RedisClientType } from "redis";
import { TYPES } from "@/di/types";
import { createTransporter, getRedisClient } from "@/config";
import {
  ICacheService,
  IEmailService,
  IMediaService,
  IOtpService,
  IPasswordHasher,
  ITokenService,
} from "@/interfaces";
import {
  CloudinaryService,
  EmailService,
  JwtService,
  OtpService,
  PasswordHasher,
  RedisService,
} from "@/infrastructure";
export const bindSharedModule = async (container: Container) => {
  container.bind<IMediaService>(TYPES.MediaService).to(CloudinaryService);
  container.bind<ICacheService>(TYPES.CacheService).to(RedisService);
  container.bind<IEmailService>(TYPES.EmailService).to(EmailService);
  container.bind<IOtpService>(TYPES.OtpService).to(OtpService);
  container.bind<IPasswordHasher>(TYPES.PasswordHasher).to(PasswordHasher);
  container.bind<ITokenService>(TYPES.TokenService).to(JwtService);
  container
    .bind<RedisClientType>(TYPES.RedisClient)
    .toConstantValue(getRedisClient());
  container
    .bind<nodemailer.Transporter>(TYPES.EmailTransporter)
    .toConstantValue(createTransporter());
};
