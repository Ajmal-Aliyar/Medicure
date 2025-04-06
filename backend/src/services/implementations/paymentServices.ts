


import { ICheckoutSession, IPaymentServices } from "../interfaces/IPaymentServices";
import { FRONTEND_BASE_URL, STRIPE_WEBHOOK_SECRET } from "../../config/env";
import { stripe } from "../../config/stripe";
import Stripe from "stripe";
import { ITransactionServices } from "../interfaces/ITransactionServices";
import { IAppointmentServices } from "../interfaces/IAppointmentServices";
import { ISlotService } from "../interfaces/ISlotServices";
import { IWalletRepository } from "../../repositories/interfaces/IWalletRepository";
import { ITransaction } from "../../models/transaction/transactionInterface";

export class PaymentServices implements IPaymentServices {
    private stripe: Stripe;
    private transactionServices: ITransactionServices;
    private appointmentServices: IAppointmentServices;
    private walletRepository: IWalletRepository;
    private slotServices: ISlotService;

    constructor(transactionServices: ITransactionServices, appointmentServices: IAppointmentServices, slotServices: ISlotService, walletRepository: IWalletRepository) {
        this.stripe = stripe;
        this.transactionServices = transactionServices;
        this.appointmentServices = appointmentServices;
        this.slotServices = slotServices;
        this.walletRepository = walletRepository;
    }

    async approveWithdrawal(transactionId: string): Promise<any> {
        try {
            console.log('approve withdraw request');

            const transaction = await this.transactionServices.getTransactionById(transactionId);
            if (!transaction || transaction.status !== 'pending') {
                throw new Error('Invalid or already processed withdrawal request.');
            }

            console.log(transaction, 'transaction');


            const transfer: any = await this.stripe.transfers.create({
                amount: transaction.amount * 100,
                currency: 'inr',
                destination: transaction.recieverId,
            });

            console.log(transfer, 'status');


            if (transfer.status === 'succeeded') {
                console.log('its success');

                await this.transactionServices.updateTransactionStatus(transactionId, 'Completed');
                await this.walletRepository.decrement(transaction.recieverId, transaction.amount);
                return { message: 'Withdrawal approved and processed successfully.' };
            }

            throw new Error('Transfer failed.');
        } catch (error) {
            console.error('Approval error:', error);
            throw new Error('Failed to approve withdrawal.');
        }
    }

    async addUserBankAccount(
        email: string,
        customerId: string,
        accountNumber: string,
        ifscCode: string,
        accountHolderName: string
    ) {
        try {
            const account = await stripe.accounts.create({
                type: 'custom',
                country: 'IN',
                email,
                business_type: 'individual',
                capabilities: {
                  transfers: { requested: true },
                },
              });

              await stripe.accounts.createExternalAccount(account.id, {
                external_account: {
                  object: 'bank_account',
                  country: 'IN',
                  currency: 'INR',
                  account_holder_name: accountHolderName,
                  account_holder_type: 'individual',
                  routing_number: ifscCode,
                  account_number: accountNumber,
                },
              });
              
              await stripe.payouts.create({
                amount: 100000,
                currency: 'INR',
              }, {
                stripeAccount: account.id, 
              });
            return 
        } catch (error) {
            console.error('Failed to add bank account:', error);
            throw error;
        }
    }

     async  createConnectedAccountAndPayout({
        email,
        accountHolderName,
        accountNumber,
        ifscCode,
        amountInRupees = 10000,
      }) {
        try {

            const account = await stripe.accounts.create({
                type: 'custom',
                country: 'GB',
                email,
                business_type: 'individual',
                capabilities: {
                  transfers: { requested: true },
                },
              });

      
          console.log('Connected Account Created:', account.id);
      
          await stripe.accounts.createExternalAccount(account.id, {
            external_account: {
              object: 'bank_account',
              country: 'GB',
              currency: 'GBP',
              account_holder_name: 'Rahul Sharma',
              account_holder_type: 'individual',
              routing_number: '10-88-00',  
              account_number: '00012345', 
            },
          });
      
          await stripe.transfers.create({
            amount: 10000,
            currency: 'GBP',
            destination: account.id,
          });
      
          await stripe.payouts.create({
            amount: 10000,
            currency: 'GBP',
          }, {
            stripeAccount: account.id,
          });
          

      
      
          return {
            accountId: account.id,
          };
      
        } catch (error: any) {
          console.error('Payout Error:', error.message);
          throw new Error(error.message);
        }
      }


    async sendPayoutToUser(amount: number, bankAccountId: string) {
        const payout = await stripe.payouts.create({
            amount: amount * 100,
            currency: "GBP",
            destination: bankAccountId,
        });

        return payout;
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
                const amount =  Math.round(((session.amount_total || 0) / 100) * 10 / 100)

                const transaction = await this.transactionServices.createTransaction({
                    transactionId: paymentIntentId,
                    senderId: metadata.patientId,
                    recieverId: metadata.doctorId,
                    amount,
                    status: 'success',
                });


                await this.walletRepository.increment(metadata.doctorId, amount)
                await this.walletRepository.increment('Company', (session.amount_total || 0) / 100)

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
            console.log(transactionId);
            const transaction = await this.transactionServices.getTransactionById(transactionId);
            if (!transaction) {
                throw new Error('Transaction not found or not refundable.');
            }

            const refund = await this.stripe.refunds.create({
                payment_intent: transactionId,
            });

            if (true) {
                await this.transactionServices.updateTransactionStatus(transactionId, 'refunded');
                await this.walletRepository.decrement(transaction.recieverId, transaction.amount);
                await this.walletRepository.decrement('Company', transaction.amount);
                await this.appointmentServices.cancelAppointmentByTransactionId(transactionId);
            }

            return refund;
        } catch (error) {
            console.error('Refund error:', error);
            throw new Error('Refund process failed.');
        }
    }
}


