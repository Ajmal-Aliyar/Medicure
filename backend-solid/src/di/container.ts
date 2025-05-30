import { Container } from "inversify";
import {
  bindAuthModule,
  bindDoctorModule,
  bindPatientModule,
  bindSharedModule,
} from "./modules";

const container: Container = new Container();

const startContainer = async () => {
  await bindAuthModule(container);
  await bindPatientModule(container);
  await bindDoctorModule(container);
  await bindSharedModule(container);
};

const getContainer = (): Container => {
  if (!container) throw new Error("Container not initialized");
  return container;
};

export { startContainer, getContainer };
