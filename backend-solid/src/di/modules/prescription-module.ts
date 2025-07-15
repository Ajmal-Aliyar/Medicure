import { Container } from "inversify";
import { TYPES } from "../types";
import { IPrescriptionRepository, PrescriptionRepository } from "@/repositories";

export const bindPrescriptionModule = async (container: Container) => { 
  container
    .bind<IPrescriptionRepository>(TYPES.PrescriptionRepository)
    .to(PrescriptionRepository);
}