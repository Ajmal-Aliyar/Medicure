import dotenv from "dotenv";

dotenv.config();

function requireEnvVar(key: string): string {
  const value =  process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export const env = {
  STRIPE_SECRET_KEY: requireEnvVar("STRIPE_SECRET_KEY"),
  STRIPE_WEBHOOK_SECRET: requireEnvVar("STRIPE_WEBHOOK_SECRET"),
  FRONTEND_BASE_URL: requireEnvVar("FRONTEND_BASE_URL"),
  AWS_ACCESS_KEY_ID: requireEnvVar("AWS_ACCESS_KEY_ID"),
  AWS_SECRET_ACCESS_KEY: requireEnvVar("AWS_SECRET_ACCESS_KEY"),
  PORT: requireEnvVar("PORT"),
  MONGO_URI: requireEnvVar("MONGO_URI"),
  JWT_REFRESH_SECRET: requireEnvVar("JWT_REFRESH_SECRET"),
  CLOUDINARY_API_NAME: requireEnvVar("CLOUDINARY_API_NAME"),
  CLOUDINARY_API_KEY: requireEnvVar("CLOUDINARY_API_KEY"),
  CLOUDINARY_API_SECRET: requireEnvVar("CLOUDINARY_API_SECRET"),
  CLOUDINARY_API_URL: requireEnvVar("CLOUDINARY_API_URL"),
  JWT_ACCESS_SECRET: requireEnvVar("JWT_ACCESS_SECRET"),
  MAIL_USER: requireEnvVar("MAIL_USER"),
  MAIL_PASS: requireEnvVar("MAIL_PASS"),
  CORS_URL: requireEnvVar("CORS_URL"),
  ACCESS_TOKEN_EXPIRY: requireEnvVar("ACCESS_TOKEN_EXPIRY"),
  REFRESH_TOKEN_EXPIRY: requireEnvVar("REFRESH_TOKEN_EXPIRY"),
  AWS_REGION: requireEnvVar("AWS_REGION"),
  AWS_BUCKET_NAME: requireEnvVar("AWS_BUCKET_NAME"),
  NODE_ENV: requireEnvVar("NODE_ENV"),
  REDIS_URL: requireEnvVar("REDIS_URL")
};
