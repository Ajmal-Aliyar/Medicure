import { env, stripe } from "@/config";
import { TYPES } from "@/di/types";
import { ISlot } from "@/models";
import { IDoctorRepository } from "@/repositories";
import { inject, injectable } from "inversify";
import Stripe from "stripe";
import {
  IPatientAppointmentService,
  IPaymentService,
  ISlotService,
} from "../interfaces";

@injectable()
export class PaymentService implements IPaymentService {
  constructor(
    @inject(TYPES.SlotService) private readonly slotService: ISlotService,
    @inject(TYPES.DoctorRepository)
    private readonly doctorRepo: IDoctorRepository,
    @inject(TYPES.PatientAppointmentService)
    private readonly patientAppointmentService: IPatientAppointmentService,
  ) {}



  async checkoutSession(
    patientId: string,
    slotId: string
  ): Promise<Stripe.Response<Stripe.Checkout.Session>> {
    const slot = await this.slotService.validateSlotAvailability(
      slotId,
      patientId
    );
    const doctorInfo = await this.doctorRepo.findBasicInfoById(
      String(slot.doctorId)
    );
    const lineItems = this.buildLineItems(slot, doctorInfo);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      success_url: `${env.FRONTEND_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${env.FRONTEND_BASE_URL}/cancel-payment?session_id={CHECKOUT_SESSION_ID}`,
      metadata: {
        doctorId: slot.doctorId.toString(),
        patientId,
        slotId: slot._id.toString(),
      },
    });
    return session;
  }




  async getSessionDetails(
    sessionId: string
  ): Promise<Stripe.Response<Stripe.Checkout.Session>> {
    if (!sessionId || typeof sessionId !== "string") {
      throw new Error("Missing sessionId");
    }
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return session;
  }




  async webhookHandler(bodyData: string, sig: string): Promise<void> {
    let event: Stripe.Event;
    event = stripe.webhooks.constructEvent(
      bodyData,
      sig,
      env.STRIPE_WEBHOOK_SECRET
    );

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const metadata = session.metadata || {};
        const { doctorId, patientId, slotId } = metadata;
        const paymentIntentId = session.payment_intent as string;
        const amount = (session.amount_total || 0) / 100;

        await this.patientAppointmentService.bookAppointment({
          doctorId,
          patientId,
          slotId,
          amount,
          paymentIntentId,
        });
      }

      case "checkout.session.expired": {
        const session = event.data.object as Stripe.Checkout.Session;
        const slotId = session.metadata?.slotId;
        if (slotId) await this.slotService.updateSlotAvailable(slotId);
        break;
      }

      case "payment_intent.canceled": {
        const intent = event.data.object as Stripe.PaymentIntent;
        const slotId = intent.metadata?.slotId;
        if (slotId) await this.slotService.updateSlotAvailable(slotId);
        break;
      }

      default:
        break;
    }
  }




  async cancelCheckout(
    slotId: string | undefined,
    patientId: string
  ): Promise<boolean> {
    return await this.slotService.releaseSlot(slotId, patientId);
  }





  private buildLineItems(
    slot: ISlot,
    doctorInfo: { name: string; specialization: string }
  ) {
    return [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: `${doctorInfo.name} (${doctorInfo.specialization})`,
            description: `Appointment from ${slot.startTime} to ${slot.endTime}, duration ${slot.duration} minutes.`,
          },
          unit_amount: slot.fees * 100,
        },
        quantity: 1,
      },
    ];
  }





























  // async approveWithdrawal(transactionId: string) {
  //   try {
  //     const transaction = await this.transactionServices.getTransactionById(
  //       transactionId
  //     );
  //     if (!transaction || transaction.status !== "pending") {
  //       throw new Error("Invalid or already processed withdrawal request.");
  //     }

  //     const transfer: any = await this.stripe.transfers.create({
  //       amount: transaction.amount * 100,
  //       currency: "inr",
  //       destination: transaction.recieverId,
  //     });

     

  //     if (transfer.status === "succeeded") {
  //       await this.transactionServices.updateTransactionStatus(
  //         transactionId,
  //         "Completed"
  //       );
  //       await this.walletRepository.decrement(
  //         transaction.recieverId,
  //         transaction.amount
  //       );
  //       return { message: "Withdrawal approved and processed successfully." };
  //     }

  //     throw new Error("Transfer failed.");
  //   } catch (error) {
  //     console.error("Approval error:", error);
  //     throw new Error("Failed to approve withdrawal.");
  //   }
  // }

  // async addUserBankAccount(
  //   email: string,
  //   customerId: string,
  //   accountNumber: string,
  //   ifscCode: string,
  //   accountHolderName: string
  // ) {
  //   try {
  //     const account = await stripe.accounts.create({
  //       type: "custom",
  //       country: "IN",
  //       email,
  //       business_type: "individual",
  //       capabilities: {
  //         transfers: { requested: true },
  //       },
  //     });

  //     await stripe.accounts.createExternalAccount(account.id, {
  //       external_account: {
  //         object: "bank_account",
  //         country: "IN",
  //         currency: "INR",
  //         account_holder_name: accountHolderName,
  //         account_holder_type: "individual",
  //         routing_number: ifscCode,
  //         account_number: accountNumber,
  //       },
  //     });

  //     await stripe.payouts.create(
  //       {
  //         amount: 100000,
  //         currency: "INR",
  //       },
  //       {
  //         stripeAccount: account.id,
  //       }
  //     );
  //     return;
  //   } catch (error) {
  //     console.error("Failed to add bank account:", error);
  //     throw error;
  //   }
  // }

  // async createConnectedAccountAndPayout({
  //   email,
  //   accountHolderName,
  //   accountNumber,
  //   ifscCode,
  //   amountInRupees = 10000,
  // }) {
  //   try {
  //     const account = await stripe.accounts.create({
  //       type: "custom",
  //       country: "GB",
  //       email,
  //       business_type: "individual",
  //       capabilities: {
  //         transfers: { requested: true },
  //       },
  //     });

  //     await stripe.accounts.createExternalAccount(account.id, {
  //       external_account: {
  //         object: "bank_account",
  //         country: "GB",
  //         currency: "GBP",
  //         account_holder_name: "Rahul Sharma",
  //         account_holder_type: "individual",
  //         routing_number: "10-88-00",
  //         account_number: "00012345",
  //       },
  //     });

  //     await stripe.transfers.create({
  //       amount: 10000,
  //       currency: "GBP",
  //       destination: account.id,
  //     });

  //     await stripe.payouts.create(
  //       {
  //         amount: 10000,
  //         currency: "GBP",
  //       },
  //       {
  //         stripeAccount: account.id,
  //       }
  //     );

  //     return {
  //       accountId: account.id,
  //     };
  //   } catch (error: unknown) {
  //     throw "Failed to create checkout session. Please try again later.";
  //   }
  // }

  // async sendPayoutToUser(amount: number, bankAccountId: string) {
  //   const payout = await stripe.payouts.create({
  //     amount: amount * 100,
  //     currency: "GBP",
  //     destination: bankAccountId,
  //   });

  //   return payout;
  // }

  // async processRefund(transactionId: string) {
  //   try {
  //     const transaction = await this.transactionServices.getTransactionById(
  //       transactionId
  //     );
  //     if (!transaction) {
  //       throw new Error("Transaction not found or not refundable.");
  //     }

  //     const refund = await this.stripe.refunds.create({
  //       payment_intent: transactionId,
  //     });

  //     if (true) {
  //       await this.transactionServices.updateTransactionStatus(
  //         transactionId,
  //         "refunded"
  //       );
  //       await this.walletRepository.decrement(
  //         transaction.recieverId,
  //         transaction.amount
  //       );
  //       await this.walletRepository.decrement("Company", transaction.amount);
  //       await this.appointmentServices.cancelAppointmentByTransactionId(
  //         transactionId
  //       );
  //     }

  //     return refund;
  //   } catch (error) {
  //     console.error("Refund error:", error);
  //     throw new Error("Refund process failed.");
  //   }
  // }
}
