import { TestReportModel } from "../../models/testReport/testReportModel";
import { uploadFileToS3 } from "../../utils/uploadFileToS3";

export class TestReportService  {
    async uploadReport(patientId: string, file: Express.Multer.File, testType: string) {
        const fileUrl = await uploadFileToS3(file, 'test-reports');
        console.log(fileUrl,'djklsfdjklfs')
        
        const report = new TestReportModel({
          patientId,
          testType,
          fileUrl,
        });
    
        await report.save();
        return report;
      }
  
    async getReportsByPatientId(patientId: string) {
      return await TestReportModel.find({ patientId });
    }
  
    async updateReportStatus(reportId: string, data: any) {
      return await TestReportModel.findByIdAndUpdate(reportId, data, { new: true });
    }
  };