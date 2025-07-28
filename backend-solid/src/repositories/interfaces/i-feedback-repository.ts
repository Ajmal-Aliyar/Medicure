import { IFeedback } from "@/models";
import { BaseRepository } from "../base";
import { FindAllOptions } from "./i-base-repository";
import { PopulatedFeedbackDetails } from "@/interfaces";

export interface IFeedbackRepository extends BaseRepository<IFeedback> {
    getFeedbackDetailsPopulated(options: FindAllOptions<IFeedback>): Promise<{
        feedbacks: PopulatedFeedbackDetails[];
        total: number;
      }>
}