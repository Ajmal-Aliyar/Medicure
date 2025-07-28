import Stripe from "stripe";

export interface IPaymentService {
    checkoutSession(patientId: string, slotId: string): Promise<Stripe.Response<Stripe.Checkout.Session>>
    webhookHandler(bodyData: string, sig: string): Promise<void>
    cancelCheckout(slotId: string  | undefined, patientId: string): Promise<boolean>
    getSessionDetails(sessionId: string | undefined): Promise<Stripe.Response<Stripe.Checkout.Session>>
}