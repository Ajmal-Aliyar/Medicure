import { Router } from "express";
import { tokenMiddleware } from "../middleware/tokenMiddleware";
import { DoctorController } from "../controllers/doctorController";

const router = Router();
const doctorController = new DoctorController();

router.get(
  "/verification-details",
  tokenMiddleware,
  doctorController.getProfileVerificationDetails
);
router.get(
  "/verification-proofs",
  tokenMiddleware,
  doctorController.getProofVerificationDetails
);
router.patch(
  "/verification-details",
  tokenMiddleware,
  doctorController.profileVerification
);
router.patch(
  "/verification-proofs",
  tokenMiddleware,
  doctorController.verificationProofs
);
router.post(
  "/submit-verification",
  tokenMiddleware,
  doctorController.submitDoctorVerification
);

export default router;
