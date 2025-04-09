import { ITestReport } from "../../models/testReport/testReportInterface";
import { TestReportModel } from "../../models/testReport/testReportModel";
import { uploadFileToS3 } from "../../utils/uploadFileToS3";

export class TestReportService {
  async uploadReport(
    patientId: string,
    file: Express.Multer.File,
    testType: string
  ) {
    const fileUrl = await uploadFileToS3(file, "test-reports");

    const report = new TestReportModel({
      patientId,
      testType,
      fileUrl,
    });

    await report.save();
    return report;
  }

  async getReportsByPatientId(patientId: string, skip: number, limit: number) {
    const testReport = await TestReportModel.find({ patientId })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await TestReportModel.countDocuments({ patientId });

    return { testReport, total };
  }

  async updateReportStatus(reportId: string, data: ITestReport) {
    return await TestReportModel.findByIdAndUpdate(reportId, data, {
      new: true,
    });
  }
}
