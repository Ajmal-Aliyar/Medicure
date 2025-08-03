import { Container } from "inversify";
import { TYPES } from "@/di/types";
import { FeedbackRepository, IFeedbackRepository } from "@/repositories";
import { FeedbackService, IFeedbackService, IPatientFeedbackService, PatientFeedbackService } from "@/services";
import { FeedbackController, IFeedbackController, IPatientFeedbackController, PatientFeedbackController } from "@/controllers";

export const bindFeedbackModule = async (container: Container) => {
  container
    .bind<IFeedbackRepository>(TYPES.FeedbackRepository)
    .to(FeedbackRepository);
  container.bind<IPatientFeedbackService>(TYPES.PatientFeedbackService).to(PatientFeedbackService);
  container
    .bind<IPatientFeedbackController>(TYPES.PatientFeedbackController)
    .to(PatientFeedbackController);
    container
    .bind<IFeedbackService>(TYPES.FeedbackService)
    .to(FeedbackService);
    container
    .bind<IFeedbackController>(TYPES.FeedbackController)
    .to(FeedbackController);
    
};
