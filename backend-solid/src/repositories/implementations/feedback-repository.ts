import { IFeedback, FeedbackModel } from "@/models";
import { BaseRepository } from "../base";
import { IFeedbackRepository } from "../interfaces";

export class FeedbackRepository extends BaseRepository<IFeedback> implements IFeedbackRepository {
    constructor() {
        super(FeedbackModel)
    }
}