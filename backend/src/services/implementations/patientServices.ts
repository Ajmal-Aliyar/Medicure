import { IPatientRepository } from "../../repositories/interfaces/IPatientRepository";
import { IPatientServices } from "../interfaces/IPatientServices";
import { IPatientAddress } from "../../types/IPatientInterface";
import { IPatient } from "../../models/patient/patientInterface";
import {
  deleteCloudinaryImages,
  extractPublicId,
} from "../../utils/CloudinaryUtil";
import { IDoctorRepository } from "../../repositories/interfaces/IDoctorRepostory";
import { IDoctor } from "../../models/doctor/doctorInterface";

export class PatientServices implements IPatientServices {
  private patientRepository: IPatientRepository;
  private doctorRepository: IDoctorRepository;

  constructor(
    patientRepository: IPatientRepository,
    doctorRepository: IDoctorRepository
  ) {
    this.patientRepository = patientRepository;
    this.doctorRepository = doctorRepository;
  }

  async getProfile(patientId: string): Promise<Partial<IPatient> | null> {
    if (!patientId || typeof patientId !== "string") {
      throw {
        message:
          "The patient ID provided is invalid. Please ensure it is a valid string.",
      };
    }
    try {
      const patientData: Partial<IPatient> | null =
        await this.patientRepository.getProfileData(patientId);
      if (!patientData) {
        throw {
          message: `No patient found with the ID: ${patientId}. Please verify the ID and try again.`,
        };
      }
      return patientData;
    } catch (error) {
      console.error(`Error fetching profile for ID ${patientId}:`, error);
      throw {
        message:
          "An error occurred while fetching the patient profile. Please try again later.",
        statusCode: 500,
      };
    }
  }

  async updateProfile({
    patientId,
    dob,
    gender,
    bloodGroup,
    houseName,
    street,
    city,
    state,
    country,
    pincode,
  }): Promise<void> {
    try {
      const address: IPatientAddress = {
        houseName,
        street,
        city,
        state,
        country,
        pincode,
      };
      const updateResult = await this.patientRepository.updateProfile({
        patientId,
        dob,
        gender,
        bloodGroup,
        address,
      });
      if (!updateResult) {
        throw new Error("Failed to update profile");
      }
    } catch (error: unknown) {
      console.error("Error updating profile:", error);
      throw error;
    }
  }

  async updateProfileImg(
    patientId: string,
    newProfileImage: string
  ): Promise<void> {
    try {
      const existingDoctor = await this.patientRepository.findByID(patientId);
      if (!existingDoctor) {
        throw { message: "Doctor not found.", statusCode: 404 };
      }
      let deleteId: string | undefined;
      if (existingDoctor.profileImage) {
        try {
          deleteId = extractPublicId(existingDoctor.profileImage);
        } catch (error) {
          throw {
            message: "Failed to extract public ID for deletion.",
            statusCode: 500,
          };
        }
      }
      const result = await this.patientRepository.profileImage({
        patientId,
        profileImage: newProfileImage,
      });

      if (!result) {
        throw {
          message: "Failed to update the profile image.",
          statusCode: 500,
        };
      }

      if (deleteId) {
        try {
          await deleteCloudinaryImages([deleteId]);
        } catch (error) {
          throw error;
        }
      }
    } catch (error) {
      console.error("Error updating profile image:", error);
      throw error.statusCode
        ? error
        : {
            message: "An unexpected error occurred. Please try again later.",
            statusCode: 500,
          };
    }
  }

  async getTopDoctors(
    skip: number,
    limit: number,
    specialization: string | null,
    search: string,
    sort: string,
    sortOrder: number,
    languageSpoken: string,
    yearsOfExperience: number | null
  ): Promise<{ data: IDoctor[]; total: number }> {
    try {
      const approvedDoctors = await this.doctorRepository.getTopDoctors(
        skip,
        limit,
        specialization,
        search,
        sort,
        sortOrder,
        languageSpoken,
        yearsOfExperience
      );
      return approvedDoctors;
    } catch (error: unknown) {
      console.error("Error fetching approved doctors:", error);
      throw error;
    }
  }
}
