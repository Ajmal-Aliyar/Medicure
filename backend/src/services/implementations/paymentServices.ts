import { ICheckoutSession, IPaymentServices } from "../interfaces/IPaymentServices";
import { FRONTEND_BASE_URL, STRIPE_WEBHOOK_SECRET } from "../../config/env";
import { stripe } from "../../config/stripe";
import Stripe from "stripe";
import { ITransactionServices } from "../interfaces/ITransactionServices";
import { IAppointmentServices } from "../interfaces/IAppointmentServices";
import { ISlotService } from "../interfaces/ISlotServices";
import { IWalletRepository } from "../../repositories/interfaces/IWalletRepository";

export class PaymentServices implements IPaymentServices {
    private stripe: Stripe;
    private transactionServices: ITransactionServices
    private appointmentServices: IAppointmentServices
    private walletRepository: IWalletRepository
    private slotServices: ISlotService

    constructor(transactionServices: ITransactionServices, appointmentServices: IAppointmentServices, slotServices: ISlotService, walletRepository: IWalletRepository ) {
        this.stripe = stripe
        this.transactionServices = transactionServices
        this.appointmentServices = appointmentServices
        this.slotServices = slotServices
        this.walletRepository = walletRepository
    }

    async checkoutSession(data: ICheckoutSession): Promise<any> {
        try {
            console.log('checkout session', FRONTEND_BASE_URL);
    
            const isAvailable = await this.slotServices.isSlotLimitExceed(data.slotId);
    
            if (!isAvailable) {
                throw new Error('Slot limit exceeded.');
            }
    
            const session = await this.stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'payment',
                line_items: [{
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: `${data.doctorName} (${data.specialization})`,
                            description: `Appointment from ${data.startTime} to ${data.endTime}, duration ${data.duration} minutes.`,
                        },
                        unit_amount: data.fees * 100,
                    },
                    quantity: 1,
                }],
                success_url: `${FRONTEND_BASE_URL}/drive/appointments?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${FRONTEND_BASE_URL}/find-doctors?cancelled=true`,
                metadata: {
                    doctorId: data.doctorId,
                    patientId: data.patientId,
                    slotId: data.slotId,
                    appointmentDate: data.appointmentDate,
                },
            });
    
            console.log('session success:', session.id);
            return session;
    
        } catch (error) {
            console.error('Error creating checkout session:', error);
            throw ('Failed to create checkout session. Please try again later.');
        }
    }
    
    async webhookHandler(bodyData: any, sig: string): Promise<void> {
        let event: Stripe.Event;
    
        try {
            event = stripe.webhooks.constructEvent(bodyData, sig, STRIPE_WEBHOOK_SECRET);
    
            if (event.type === 'checkout.session.completed') {
                const session = event.data.object as Stripe.Checkout.Session;
                const metadata = session.metadata || {};
    
                const paymentIntentId = session.payment_intent as string; 
    
                const transaction = await this.transactionServices.createTransaction({
                    transactionId: paymentIntentId,
                    senderId: metadata.patientId,
                    recieverId: metadata.doctorId,
                    amount: (session.amount_total || 0) / 100,
                    status: 'success',
                });

                await this.walletRepository.increment(metadata.doctorId,(session.amount_total || 0) / 100)

                if (!transaction) {
                    throw new Error('Failed to store transaction');
                }
    
                const appointment = await this.appointmentServices.createAppointment({
                    doctorId: metadata.doctorId,
                    patientId: metadata.patientId,
                    slotId: metadata.slotId,
                    appointmentDate: new Date(),
                    status: 'Scheduled',
                    transactionId: paymentIntentId,
                });
    
                if (!appointment) {
                    throw new Error('Failed to create appointment');
                }
    
                const incBooked = await this.slotServices.incBooked(metadata.slotId);
    
                if (incBooked.modifiedCount === 0) {
                    throw new Error('Unable to update slot booking.');
                }
            } else {
                console.log(`Unhandled event type: ${event.type}`);
            }
        } catch (error) {
            if (error instanceof Stripe.errors.StripeSignatureVerificationError) {
                console.error('Invalid Stripe signature:', error.message);
            } else {
                console.error('Error handling webhook event:', error);
            }
            throw new Error('Webhook handling failed.');
        }
    }
    

    async processRefund(transactionId: string): Promise<any> {
        try {
            console.log(transactionId)
            const transaction = await this.transactionServices.getTransactionById(transactionId);
            if (!transaction) {
                throw new Error('Transaction not found or not refundable.');
            }
            
            const refund = await this.stripe.refunds.create({
                payment_intent: transactionId,
            });
    
            if (true) {
                await this.transactionServices.updateTransactionStatus(transactionId, 'refunded');
                await this.walletRepository.decrement(transaction.recieverId, transaction.amount)
                await this.appointmentServices.cancelAppointmentByTransactionId(transactionId);
                console.log('refund status success')
            }
    
            return refund;
        } catch (error) {
            console.error('Refund error:', error);
            throw new Error('Refund process failed.');
        }
    }
    
}
