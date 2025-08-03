import Stripe from 'stripe';
import { env } from './env.config';


export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
    // apiVersion: '2025-01-27.acacia','2025-06-30.basil'
    apiVersion: '2025-06-30.basil'
});