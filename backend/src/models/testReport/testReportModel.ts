import mongoose from "mongoose";
import { ITestReport } from "./testReportInterface";
import { TestReportSchema } from "./testReportSchema";

export const TestReportModel = mongoose.model<ITestReport>('TestReport', TestReportSchema);
