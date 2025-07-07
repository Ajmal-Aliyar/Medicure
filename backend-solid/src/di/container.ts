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
const container: Container = new Container();

const startContainer = async () => {
  await bindAuthModule(container);
  await bindPatientModule(container);
  await bindDoctorModule(container);
  await bindSharedModule(container);
  await bindAdminModule(container);
  await bindSpecializationModule(container);
  await bindScheduleModule(container);
  await bindSlotModule(container);
  await bindPaymentModule(container);
  await bindAppointmentModule(container);
};

const getContainer = (): Container => {
  if (!container) throw new Error("Container not initialized");
  return container;
};

export { startContainer, getContainer };
