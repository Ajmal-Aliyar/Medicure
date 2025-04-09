import { Router } from "express";
import { tokenMiddleware } from "../middleware/tokenMiddleware";
import { DoctorController } from "../controllers/doctorController";
import { isAdmin } from "../middleware/isAdmin";
import { isDoctor } from "../middleware/isDoctor";

const router = Router();
const doctorController = new DoctorController();

router.get(
  "/profile-details",
  tokenMiddleware,
  isDoctor,
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
  isAdmin,
  doctorController.getDoctorsDetails
);

export default router;
