import { Request, Response, Router } from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-01-27.acacia',
});

router.post('/create-checkout-session', async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('reached payment',req.body)
    const { doctorName, specialization, startTime,  endTime, duration, fees } = req.body
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items:[{
        price_data: {
          currency: 'inr',
          product_data: {
            name: `${doctorName} (${specialization})`,
            description: `Your appointment is scheduled from ${startTime} to ${endTime}, with a duration of ${duration} minutes. We look forward to serving you during this time.`,
          },
          unit_amount: fees * 100,
        },
        quantity: 1, 
      }],
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/cancel`,
    });
    console.log(session,'session')
    res.status(200).json({ sessionUrl: session.url });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
