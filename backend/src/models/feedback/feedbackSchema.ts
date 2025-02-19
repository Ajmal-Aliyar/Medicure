import { InferSchemaType, Schema } from "mongoose";
import { IFeedback } from "./feedbackInterface";


export const FeedbackSchema = new Schema<IFeedback>({
    patientId: {
        type: String,
        required: true
    },
    doctorId: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comments: {
        type: String,
        required: true
    }
})

export type IFeedbackDocument = InferSchemaType<typeof FeedbackSchema>;
