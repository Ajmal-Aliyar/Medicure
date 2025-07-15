import { Container } from "inversify";
import {
  bindAdminModule,
  bindAppointmentModule,
  bindAuthModule,
  bindDoctorModule,
  bindFeedbackModule,
  bindPatientModule,
  bindPaymentModule,
  bindPrescriptionModule,
  bindScheduleModule,
  bindSharedModule,
  bindSlotModule,
  bindSpecializationModule,
  bindTransactionModule,
  bindWalletModule,
} from "@/di";

const container: Container = new Container();

const startContainer =  () => {
   bindAuthModule(container);
   bindPatientModule(container);
   bindDoctorModule(container);
   bindSharedModule(container);
   bindAdminModule(container);
   bindSpecializationModule(container);
   bindScheduleModule(container);
   bindSlotModule(container);
   bindPaymentModule(container);
   bindAppointmentModule(container);
   bindTransactionModule(container);
   bindWalletModule(container)
   bindPrescriptionModule(container)
   bindFeedbackModule(container)
};

const getContainer = (): Container => {
  if (!container) throw new Error("Container not initialized");
  return container;
};

export { startContainer, getContainer };
