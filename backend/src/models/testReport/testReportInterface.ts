import mongoose, { InferSchemaType } from 'mongoose';
import { TestReportSchema } from './testReportSchema';

export type ITestReport = InferSchemaType<typeof TestReportSchema>  & { _id: mongoose.Types.ObjectId };
