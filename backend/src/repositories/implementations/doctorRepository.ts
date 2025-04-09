import {
  ICreateUser,
  IDoctorDocument,
  IProfileVerificationInput,
} from "../../types/IDoctorInterface";
import { IDoctor } from "../../models/doctor/doctorInterface";
import { DoctorModel } from "../../models/doctor/doctorModel";
import mongoose, { DeleteResult, FilterQuery, UpdateResult } from "mongoose";
import { IDoctorRepository } from "../interfaces/IDoctorRepostory";

export class DoctorRepository implements IDoctorRepository {
  async createDoctor({
    fullName,
    email,
    phone,
    password,
  }: ICreateUser): Promise<IDoctorDocument> {
    if (!email) {
      throw new Error("Email cannot be null or empty");
    }
    const existingUser = await DoctorModel.findOne({ email });
    if (existingUser) {
      throw new Error("User with this email already exists");
    }
    const doctor = new DoctorModel({ fullName, email, phone, password });
    return await doctor.save();
  }

  async getAllDoctors(): Promise<IDoctorDocument[]> {
    return await DoctorModel.find({});
  }

  async updateDoctor(
    _id: string,
    {
      fullName,
      headline,
      about,
      address,
      gender,
      specialization,
      languageSpoken,
      dob,
    }
  ): Promise<void> {
    const result = await DoctorModel.updateOne(
      { _id },
      {
        $set: {
          fullName,
          headline,
          about,
          address,
          gender,
          specialization,
          languageSpoken,
          dob,
        },
      }
    );
  }

  async fetchAllApprovedDoctors(
    skip: number,
    limit: number,
    searchQuery: string
  ): Promise<{ data: IDoctor[]; total: number }> {
    try {
      const query: FilterQuery<IDoctor> = { isApproved: true };

      if (searchQuery) {
        query.$or = [
          { fullName: { $regex: searchQuery, $options: "i" } },
          { specialization: { $regex: searchQuery, $options: "i" } },
        ];
      }

      const doctors = await DoctorModel.find(query)
        .skip(skip)
        .limit(limit)
        .select("rating profileImage fullName specialization reviewCount")
        .lean();

      const total = await DoctorModel.countDocuments(query);

      return { data: doctors, total };
    } catch (error) {
      console.error("Error fetching doctors:", error);
      throw new Error("Unable to fetch doctors");
    }
  }

  async fetchAllRequestedDoctors(
    skip: number,
    limit: number
  ): Promise<{ data: IDoctor[]; hasMore: boolean }> {
    try {
      const doctors = await DoctorModel.find({
        isProfileCompleted: true,
        isApproved: false,
      })
        .skip(skip)
        .limit(limit)
        .select("rating profileImage fullName specialization")
        .lean();

      const hasMore = doctors.length === limit;

      return { data: doctors, hasMore };
    } catch (error) {
      console.error("Error fetching doctors:", error);
      throw new Error("Unable to fetch doctors");
    }
  }

  async getMinDetails(_id: mongoose.Types.ObjectId): Promise<{
    _id: mongoose.Types.ObjectId;
    fullName: string;
    profileImage: string;
  }> {
    try {
      return await DoctorModel.findOne(
        { _id },
        { fullName: 1, profileImage: 1 }
      );
    } catch (error) {
      throw "Error fetching details: " + error;
    }
  }

  async findByEmail(email: string): Promise<IDoctor> {
    return await DoctorModel.findOne({ email });
  }

  async findByID(_id: string): Promise<IDoctor> {
    return await DoctorModel.findById(_id);
  }

  async getProfileImage(_id: string): Promise<{ profileImage: string | null }> {
    const doctor = await DoctorModel.findOne(
      { _id },
      { profileImage: 1 }
    ).lean();
    return doctor
      ? { profileImage: doctor.profileImage }
      : { profileImage: null };
  }

  async profileImage({
    _id,
    profileImage,
  }: {
    _id: string;
    profileImage: string;
  }): Promise<UpdateResult> {
    try {
      return await DoctorModel.updateOne({ _id }, { $set: { profileImage } });
    } catch (error) {
      throw new Error("Error updating profile image: " + error);
    }
  }

  async updateProfileData({
    _id,
    registrationNumber,
    registrationCouncil,
    registrationYear,
    yearsOfExperience,
    degree,
    university,
    yearOfCompletion,
  }: IProfileVerificationInput): Promise<{ modifiedCount: number }> {
    try {
      const updateResult = await DoctorModel.updateOne(
        { _id },
        {
          $set: {
            registrationNumber,
            registrationCouncil,
            registrationYear,
            educationDetails: {
              degree,
              university,
              yearOfCompletion,
            },
            yearsOfExperience,
          },
        }
      );
      return updateResult;
    } catch (error: unknown) {
      console.error(`Error updating profile data: ${error}`);
      throw new Error("Error updating profile data, please try again.");
    }
  }

  async updateVerficationProofs(
    _id: string,
    establishmentProof: string | null,
    identityProof: string | null,
    medicalRegistration: string | null
  ): Promise<UpdateResult> {
    try {
      const updateData = {};
      if (establishmentProof !== null) {
        updateData[establishmentProof] = establishmentProof;
      }
      if (identityProof !== null) {
        updateData[identityProof] = identityProof;
      }
      if (medicalRegistration !== null) {
        updateData[medicalRegistration] = medicalRegistration;
      }
      if (Object.keys(updateData).length > 0) {
        const updateResult = await DoctorModel.updateOne(
          { _id },
          { $set: updateData }
        );
        return updateResult;
      } else {
        throw new Error("No data to update");
      }
    } catch (error: unknown) {
      console.error(`Error updating proof verification data: ${error}`);
      throw new Error(
        "Error updating proof verification data, please try again."
      );
    }
  }

  async updatekProfileComplete(_id: string): Promise<UpdateResult> {
    return await DoctorModel.updateOne(
      { _id },
      { $set: { isProfileCompleted: true } }
    );
  }

  async updateFees(_id: string, fees: number): Promise<UpdateResult> {
    return await DoctorModel.updateMany({ _id }, { $set: { fees } });
  }

  async getFees(doctorId: string): Promise<number | null> {
    const _id = new mongoose.Types.ObjectId(doctorId);
    const doctor = await DoctorModel.findById(_id).select("fees");
    return doctor ? doctor.fees : null;
  }

  async changePassword(_id: string, password: string): Promise<UpdateResult> {
    return await DoctorModel.updateOne({ _id }, { $set: { password } });
  }

  async approveDoctor(_id: string): Promise<UpdateResult> {
    return await DoctorModel.updateOne({ _id }, { $set: { isApproved: true } });
  }

  async deleteDoctor(_id: string): Promise<DeleteResult> {
    return await DoctorModel.deleteOne({ _id });
  }

  async block(_id: string): Promise<UpdateResult> {
    return await DoctorModel.updateOne({ _id }, { $set: { isBlocked: true } });
  }

  async unblock(_id: string): Promise<UpdateResult> {
    return await DoctorModel.updateOne({ _id }, { $set: { isBlocked: false } });
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
      const query: FilterQuery<IDoctor> = { isApproved: true };

      if (specialization) {
        query.specialization = { $regex: new RegExp(specialization, "i") };
      }

      if (search) {
        query.$or = [
          { fullName: { $regex: new RegExp(search, "i") } },
          { specialization: { $regex: new RegExp(search, "i") } },
        ];
      }

      if (languageSpoken) {
        query.languageSpoken = { $regex: new RegExp(languageSpoken, "i") };
      }

      if (yearsOfExperience) {
        const experience = yearsOfExperience;
        if (!isNaN(experience)) {
          query.yearsOfExperience = { $gte: experience };
        }
      }

      const sortOptions: FilterQuery<IDoctor> = {};
      switch (sort) {
        case "rating":
          sortOptions.rating = sortOrder;
          break;
        case "yearsOfExperience":
          sortOptions.yearsOfExperience = sortOrder;
          break;
        case "reviewCount":
          sortOptions.reviewCount = sortOrder;
          break;
        case "fees":
          sortOptions.fees = sortOrder;
          break;
        case "name":
          sortOptions.fullName = sortOrder;
          break;
        default:
          sortOptions.rating = sortOrder;
      }

      const doctors = await DoctorModel.find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .select(
          "profileImage fullName specialization languageSpoken yearsOfExperience rating reviewCount fees"
        )
        .lean();

      const total = await DoctorModel.countDocuments(query);

      return { data: doctors, total };
    } catch (error) {
      console.error("Error fetching doctors:", error);
      throw new Error("Unable to fetch doctors");
    }
  }

  async updateReview(
    _id: string,
    rating: number,
    reviewCount: number
  ): Promise<UpdateResult> {
    return await DoctorModel.updateOne(
      { _id },
      { $set: { rating, reviewCount } }
    );
  }
}
