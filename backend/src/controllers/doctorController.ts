import { Request, Response } from "express";
import { DoctorService } from "../services/implementations/doctorServices";
import { IProfileVerificationRequestBody } from "../types/IDoctorInterface";
import { NextFunction } from "express-serve-static-core";

const doctorService = new DoctorService();

export class DoctorController {
  async getProfileImage(req: Request, res: Response, next: NextFunction) {
    try {
      const { _id: doctorId } = req.client;
      const profileImage = await doctorService.getProfileImage(doctorId);
      res.status(200).json({ profileImage: profileImage.profileImage });
    } catch (error) {
      next(error);
    }
  }

  async getProfileDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const { _id: doctorId } = req.client;
      const doctorData = await doctorService.getProfileDetails(doctorId);
      res.status(200).json(doctorData);
    } catch (error) {
      next(error);
    }
  }

  async updateProfileImg(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { _id: doctorId } = req.client;
    const { profileImage } = req.body;

    try {
      if (!profileImage) {
        res.status(400).json({ message: "Profile image is required." });
        return;
      }
      await doctorService.updateProfileImg(doctorId, profileImage);
      res.status(200).json({ message: "Profile image updated successfully." });
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { _id: doctorId } = req.client;
      const {
        fullName,
        headline,
        about,
        gender,
        specialization,
        languageSpoken,
        dob,
        addressLine,
        streetAddress,
        city,
        state,
        country,
        pincode,
      } = req.body;
      await doctorService.updateDoctor(doctorId, {
        fullName,
        headline,
        about,
        gender,
        specialization,
        languageSpoken,
        dob,
        addressLine,
        streetAddress,
        city,
        state,
        country,
        pincode,
      });

      res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
      next(error);
    }
  }

  async getProfileVerificationDetails(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const doctorId = req.client._id;
      const doctorProfile =
        await doctorService.getProfileVerificationDetailsByID(doctorId);

      if (!doctorProfile) {
        res.status(404).json({ error: "Doctor profile not found" });
      }

      res.status(200).json(doctorProfile);
    } catch (error: unknown) {
      next(error);
    }
  }

  async getProofVerificationDetails(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const doctorId = req.client._id;
      const doctorProfile = await doctorService.getProofVerificationDetailsByID(
        doctorId
      );

      if (!doctorProfile) {
        res.status(404).json({ error: "Doctor profile not found" });
      }

      res.status(200).json(doctorProfile);
    } catch (error: unknown) {
      next(error);
    }
  }

  async profileVerification(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const {
      registrationNumber,
      registrationCouncil,
      registrationYear,
      degree,
      university,
      yearOfCompletion,
      yearsOfExperience,
    }: IProfileVerificationRequestBody = req.body;

    const doctorId: string = req.client._id;

    try {
      await doctorService.profileVerification({
        _id: doctorId,
        registrationNumber,
        registrationCouncil,
        registrationYear,
        degree,
        university,
        yearOfCompletion,
        yearsOfExperience,
      });
      res
        .status(200)
        .json({ message: "Profile verification details updated successfully" });
    } catch (error: unknown) {
      next(error);
    }
  }

  async verificationProofs(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { establishmentProof, identityProof, medicalRegistration } = req.body;
    const doctorId: string = req.client._id;
    try {
      await doctorService.verificationProofs(
        doctorId,
        establishmentProof,
        identityProof,
        medicalRegistration
      );
      res
        .status(200)
        .json({ message: "Verification proofs uploaded successfully" });
    } catch (error: unknown) {
      next(error);
    }
  }

  async submitDoctorVerification(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { _id: doctorId }: { _id: string } = req.client;

    try {
      const status = await doctorService.submitDoctorVerification(doctorId);
      res.status(200).json({ status });
    } catch (error: unknown) {
      next(error);
    }
  }

  async getDoctorsDetails(_req: Request, res: Response, next: NextFunction) {
    try {
      const doctorDetails = await doctorService.getAllDoctors();
      res.status(200).json(doctorDetails);
    } catch (error: unknown) {
      next(error);
    }
  }
}
