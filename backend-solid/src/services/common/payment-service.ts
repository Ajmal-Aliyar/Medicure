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
    private readonly patientAppointmentService: IPatientAppointmentService
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
      success_url: `${env.FRONTEND_BASE_URL}/drive/appointments?session_id={CHECKOUT_SESSION_ID}`,
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

    try {
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
          const amount = Math.round(
            (((session.amount_total || 0) / 100) * 90) / 100
          );

          // const transaction = await this.transactionServices.createTransaction({
          //   transactionId: paymentIntentId,
          //   senderId: metadata.patientId,
          //   recieverId: metadata.doctorId,
          //   amount,
          //   status: "success",
          // });

          // await this.walletRepository.increment(metadata.doctorId, amount);
          // await this.walletRepository.increment(
          //   "Company",
          //   (session.amount_total || 0) / 100
          // );

          // if (!transaction) {
          //   throw new Error("Failed to store transaction");
          // }

          await this.patientAppointmentService.createAppointment({
            doctorId,
            patientId,
            slotId,
            status: "scheduled",
            transactionId: paymentIntentId,
          });

          await this.slotService.bookSlot( slotId, patientId);
        }
        case "checkout.session.expired": {
          const session = event.data.object as Stripe.Checkout.Session;
          const slotId = session.metadata?.slotId;
          if (slotId) {
            // await this.slotRepo.update(slotId, { status: "available" });
          }
          break;
        }

        case "payment_intent.canceled": {
          const intent = event.data.object as Stripe.PaymentIntent;
          const slotId = intent.metadata?.slotId;
          if (slotId) {
            // await this.slotRepo.update(slotId, { status: "available" });
          }
          break;
        }

        default:
          break;
      }
    } catch (error) {
      if (error instanceof Stripe.errors.StripeSignatureVerificationError) {
        console.error("Invalid Stripe signature:", error);
      } else {
        console.error("Error handling webhook event:", error);
      }
      throw new Error("Webhook handling failed.");
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
}
