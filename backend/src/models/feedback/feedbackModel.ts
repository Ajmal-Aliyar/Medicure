import mongoose from "mongoose";
import { FeedbackSchema } from "./feedbackSchema";
import { IFeedback } from "./feedbackInterface";

export const FeedbackModel = mongoose.model<IFeedback>('Feedback', FeedbackSchema)