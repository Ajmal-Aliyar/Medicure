import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3000),
  FRONTEND_BASE_URL: z.string().url(),

  MONGODB_URI: z.string().url(),
  REDIS_URL: z.string().url(),

  ACCESS_TOKEN_SECRET: z.string().min(1),
  REFRESH_TOKEN_SECRET: z.string().min(1),

  EMAIL_USER: z.string().email(),
  EMAIL_PASS: z.string().min(1),

  CLOUDINARY_API_URL: z.string().url(),
  CLOUDINARY_API_SECRET: z.string().min(1),
  CLOUDINARY_API_KEY: z.string().min(1),

  STRIPE_SECRET_KEY: z.string().min(1),
  STRIPE_WEBHOOK_SECRET: z.string().min(1),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('Invalid environment variables:', parsedEnv.error.format());
  process.exit(1);
}

export const env = parsedEnv.data;
