import express, { Request, Response, Router } from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import { TransactionRepository } from '../repositories/implementations/transactionRepository';
import { TransactionServices } from '../services/implementations/transactionServices';
import { AppointmentRepository } from '../repositories/implementations/appointmentRepository';
import { AppointmentServices } from '../services/implementations/appointmentServices';

const transactionRepository = new TransactionRepository();
const transactionServices = new TransactionServices(transactionRepository);
const appointmentRepository = new AppointmentRepository();
const appointmentServices = new AppointmentServices(appointmentRepository);

dotenv.config();

const router = Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-01-27.acacia',
});

router.post('/create-checkout-session', async (req: Request, res: Response) => {
  try {
    console.log(req.body, 'data');
    const { doctorName, specialization, startTime, endTime, duration, fees, patientId, doctorId, appointmentDate, slotId } = req.body;


    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: 'inr',
          product_data: {
            name: `${doctorName} (${specialization})`,
            description: `Appointment from ${startTime} to ${endTime}, duration ${duration} minutes.`,
          },
          unit_amount: fees * 100,
        },
        quantity: 1,
      }],
      success_url: `${req.headers.origin}/transaction/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/transaction/cancel`,
      metadata: {
        doctorId,
        patientId,
        slotId,
        appointmentDate,
      },
    });

    res.status(200).json({ sessionUrl: session.url });
  } catch (error: any) {
    console.error('Error creating checkout session:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/webhook', express.raw({ type: 'application/json' }), async (req: Request, res: Response) => {
  console.log('Webhook called');
  console.log('signature', req.headers);
  const sig = req.headers['stripe-signature'] as string;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET as string);
    console.log(event, 'event');

    if (event.type === 'checkout.session.completed') {
      console.log('Checkout session completed');
      const session = event.data.object as Stripe.Checkout.Session;
      const metadata = session.metadata || {};

      try {
        const transaction = await transactionServices.createTransaction({
          senderId: metadata.patientId,
          recieverId: metadata.doctorId,
          amount: (session.amount_total || 0) / 100,
          status: 'success',
        });

        if (transaction) {
          const appointment = await appointmentServices.createAppointment({
            doctorId: metadata.doctorId,
            patientId: metadata.patientId,
            slotId: metadata.slotId,
            appointmentDate: metadata.appointmentDate,
            status: 'scheduled',
            transactionId: transaction._id,
          });

          if (appointment) {
            console.log('Appointment successfully created and transaction stored!');
          } else {
            throw new Error('Failed to create appointment');
          }
        } else {
          throw new Error('Failed to store transaction');
        }

        res.json({ received: true });
      } catch (error: any) {
        console.error('Error processing webhook:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    } else {
      console.log(`Unhandled event type: ${event.type}`);
      res.json({ received: true });
    }
  } catch (error: any) {
    console.error('Webhook signature verification failed:', error.message);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
});

export default router;
