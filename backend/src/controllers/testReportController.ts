import { Request, Response } from 'express';
import { TestReportService } from '../services/implementations/testReportServices';
import { skip } from 'node:test';

const testReportService = new TestReportService()

export class TestReportController {

    async uploadReport(req: Request, res: Response) {
        try {
          if (!req.file) {
             res.status(400).json({ message: 'No file uploaded' });
          }
      
          const { testType } = req.body;
          if (!testType) {
             res.status(400).json({ message: 'Test type is required' });
          }
      
          if (!req.client?._id) {
             res.status(403).json({ message: 'Unauthorized' });
          }
      
          const report = await testReportService.uploadReport(req.client._id, req.file, testType);
      
            res.status(201).json({ success: true, report, message: 'Report uploaded successfully' });
        } catch (error: any) {
          console.error('Error in uploadReport:', error);
           res.status(500).json({ success: false, message: error.message });
        }
      };

    async getReportsByPatientId(req: Request, res: Response) {
        try {
            const skip = parseInt(req.query.skip as string) || 0;
            const limit = parseInt(req.query.limit as string) || 5;
            console.log('hrloosd')

            const reports = await testReportService.getReportsByPatientId(req.params.patientId, skip, limit);
            res.status(200).json(reports);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    async updateReportStatus(req: Request, res: Response) {
        try {
            const result = await testReportService.updateReportStatus(req.params.reportId, req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

}


