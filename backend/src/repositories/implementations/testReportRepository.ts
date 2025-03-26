import { ITestReport } from "../../models/testReport/testReportInterface";
import { TestReportModel } from "../../models/testReport/testReportModel";


export class TestReportRepository {
  async createReport(data: Partial<ITestReport>): Promise<ITestReport> {
    const report = new TestReportModel(data);
    return await report.save();
  }

  async getReportsByPatientId(patientId: string): Promise<ITestReport[]> {
    return await TestReportModel.find({ patientId });
  }

  async updateReportStatus(reportId: string, updateData: Partial<ITestReport>): Promise<ITestReport | null> {
    return await TestReportModel.findByIdAndUpdate(reportId, updateData, { new: true });
  }
};