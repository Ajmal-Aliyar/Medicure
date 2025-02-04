import Stripe from 'stripe';
import { STRIPE_SECRET_KEY } from './env';

export const stripe = new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: '2025-01-27.acacia',
});