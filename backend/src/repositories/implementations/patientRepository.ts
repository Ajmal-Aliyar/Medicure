import mongoose, { UpdateResult } from "mongoose";
import { ICreatePatient, IUpdateProfile } from "../../types/IPatientInterface";
import {
  IPatientDocument,
  IPatientRepository,
} from "../interfaces/IPatientRepository";
import { IPatient } from "../../models/patient/patientInterface";
import { PatientModel } from "../../models/patient/patientModel";

export class PatientRepository implements IPatientRepository {
  async createUser({
    fullName,
    email,
    phone,
    password,
  }: ICreatePatient): Promise<IPatientDocument> {
    if (!email) {
      throw new Error("Email cannot be null or empty");
    }
    const existingUser = await PatientModel.findOne({ email });
    if (existingUser) {
      throw new Error("User with this email already exists");
    }
    const user = new PatientModel({ fullName, email, phone, password });
    return await user.save();
  }

  async createAuthUser({
    fullName,
    email,
    profileImage,
    password,
  }: ICreatePatient): Promise<IPatientDocument> {
    const user = new PatientModel({ fullName, email, profileImage, password });
    return await user.save();
  }

  async findByEmail(email: string): Promise<IPatient> {
    return await PatientModel.findOne({ email });
  }

  async findByID(_id: string): Promise<IPatient> {
    return await PatientModel.findById(_id);
  }

  async changePassword(email: string, password: string): Promise<UpdateResult> {
    return await PatientModel.updateOne({ email }, { $set: { password } });
  }

  async getProfileData(_id: string): Promise<Partial<IPatient> | null> {
    return await PatientModel.findById(_id)
      .select("profileImage fullName phone email dob bloodGroup gender address")
      .lean()
      .exec();
  }

  async updateProfile({
    _id,
    dob,
    gender,
    bloodGroup,
    address,
  }: IUpdateProfile): Promise<UpdateResult> {
    try {
      return await PatientModel.updateOne(
        { _id },
        { dob, gender, bloodGroup, address }
      );
    } catch (error) {
      throw "Error updating profile: " + error;
    }
  }

  async profileImage({
    _id,
    profileImage,
  }: {
    _id: string;
    profileImage: string;
  }): Promise<UpdateResult> {
    try {
      return await PatientModel.updateOne({ _id }, { $set: { profileImage } });
    } catch (error) {
      throw "Error updating profile image: " + error;
    }
  }

  async getMinDetails(
    _id: mongoose.Types.ObjectId
  ): Promise<{
    _id: mongoose.Types.ObjectId;
    fullName: string;
    profileImage: string;
  }> {
    try {
      return await PatientModel.findOne(
        { _id },
        { fullName: 1, profileImage: 1 }
      );
    } catch (error) {
      throw "Error fetching details: " + error;
    }
  }

  async getAllPatient(
    skip: number,
    limit: number
  ): Promise<{ data: IPatientDocument[]; total: number }> {
    try {
      const [patients, total] = await Promise.all([
        PatientModel.find().skip(skip).limit(limit).lean(),
        PatientModel.countDocuments(),
      ]);

      return { data: patients, total };
    } catch (error) {
      console.error("Error fetching patients:", error);
      throw new Error("Unable to fetch patients");
    }
  }

  async block(_id: string): Promise<UpdateResult> {
    return await PatientModel.updateOne({ _id }, { $set: { isBlocked: true } });
  }

  async unblock(_id: string): Promise<UpdateResult> {
    return await PatientModel.updateOne(
      { _id },
      { $set: { isBlocked: false } }
    );
  }
}
