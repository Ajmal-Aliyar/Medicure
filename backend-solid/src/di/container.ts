import { Container } from "inversify";
import {
  bindAdminModule,
  bindAppointmentModule,
  bindAuthModule,
  bindConnectionRequestModule,
  bindConversationModule,
  bindDoctorModule,
  bindFeedbackModule,
  bindMedicalRecordModule,
  bindMessageModule,
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
   bindWalletModule(container);
   bindPrescriptionModule(container);
   bindFeedbackModule(container);
   bindMedicalRecordModule(container);
   bindConnectionRequestModule(container);
   bindConversationModule(container);
   bindMessageModule(container);
};

const getContainer = (): Container => {
  if (!container) throw new Error("Container not initialized");
  return container;
};

export { startContainer, getContainer };
