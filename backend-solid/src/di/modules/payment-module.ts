import { Container } from "inversify";
import { TYPES } from "../types";
import { IPaymentService, PaymentService } from "@/services";
import { IPaymentController, PaymentController } from "@/controllers";


export const bindPaymentModule = async (container: Container) => { 
  container
    .bind<IPaymentService>(TYPES.PaymentService)
    .to(PaymentService);
    container
    .bind<IPaymentController>(TYPES.PaymentController)
    .to(PaymentController);
  
}