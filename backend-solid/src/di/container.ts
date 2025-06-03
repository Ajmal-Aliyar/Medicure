import { Container } from "inversify";
import {
  bindAdminModule,
  bindAuthModule,
  bindDoctorModule,
  bindPatientModule,
  bindSharedModule,
} from "@/di";

const container: Container = new Container();

const startContainer = async () => {
  await bindAuthModule(container);
  await bindPatientModule(container);
  await bindDoctorModule(container);
  await bindSharedModule(container);
  await bindAdminModule(container);
};

const getContainer = (): Container => {
  if (!container) throw new Error("Container not initialized");
  return container;
};

export { startContainer, getContainer };
