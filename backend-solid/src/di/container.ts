import { Container } from "inversify";
import {
  bindAdminModule,
  bindAppointmentModule,
  bindAuthModule,
  bindDoctorModule,
  bindPatientModule,
  bindPaymentModule,
  bindScheduleModule,
  bindSharedModule,
  bindSlotModule,
  bindSpecializationModule,
} from "@/di";
import { bindTransactionModule } from "./modules/transaction-module";
import { bindWalletModule } from "./modules/wallet.module";
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
};

const getContainer = (): Container => {
  if (!container) throw new Error("Container not initialized");
  return container;
};

export { startContainer, getContainer };
