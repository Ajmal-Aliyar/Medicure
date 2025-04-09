import express from "express";
import { TestReportController } from "../controllers/testReportController";
import { tokenMiddleware } from "../middleware/tokenMiddleware";

const router = express.Router();
const testReportController = new TestReportController();

import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  "/upload",
  tokenMiddleware,
  upload.single("file"),
  testReportController.uploadReport
);
router.get(
  "/:patientId",
  tokenMiddleware,
  testReportController.getReportsByPatientId
);
router.patch(
  "/:reportId",
  tokenMiddleware,
  testReportController.updateReportStatus
);

export default router;
