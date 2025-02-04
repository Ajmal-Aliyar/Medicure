import dotenv from 'dotenv'; 
dotenv.config() 

export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY as string
export const FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL as string
export const STRIPE_WEBHOOK_SECRET =  process.env.STRIPE_WEBHOOK_SECRET as string