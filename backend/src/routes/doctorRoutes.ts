import { Router } from "express";
import { tokenMiddleware } from "../middleware/tokenMiddleware";
import { DoctorController } from "../controllers/doctorController";
import { authorizeRoles } from "../middleware/authorizeRoles";

const router = Router();
const doctorController = new DoctorController();

router.get(
  "/profile-details",
  tokenMiddleware,
  authorizeRoles('doctor'),
  doctorController.getProfileDetails
);
router.patch(
  "/profile-update",
  tokenMiddleware,
  doctorController.updateProfile
);
router.patch(
  "/update-profile-image",
  tokenMiddleware,
  doctorController.updateProfileImg
);

router.get(
  "/getProfileImage",
  tokenMiddleware,
  doctorController.getProfileImage
);

router.get(
  "/get-doctor-details",
  tokenMiddleware,
  authorizeRoles('admin'),
  doctorController.getDoctorsDetails
);

export default router;
