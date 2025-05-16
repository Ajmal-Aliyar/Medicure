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

  async findByID(patientId: string): Promise<IPatient> {
    return await PatientModel.findById(patientId);
  }

  async changePassword(email: string, password: string): Promise<UpdateResult> {
    return await PatientModel.updateOne({ email }, { $set: { password } });
  }

  async getProfileData(patientId: string): Promise<Partial<IPatient> | null> {
    return await PatientModel.findById(patientId)
      .select("profileImage fullName phone email dob bloodGroup gender address")
      .lean()
      .exec();
  }

  async updateProfile({
    patientId,
    dob,
    gender,
    bloodGroup,
    address,
  }: IUpdateProfile): Promise<UpdateResult> {
    try {
      return await PatientModel.updateOne(
        { _id: patientId },
        { dob, gender, bloodGroup, address }
      );
    } catch (error) {
      throw "Error updating profile: " + error;
    }
  }

  async profileImage({
    patientId,
    profileImage,
  }: {
    patientId: string;
    profileImage: string;
  }): Promise<UpdateResult> {
    try {
      return await PatientModel.updateOne(
        { _id: patientId },
        { $set: { profileImage } }
      );
    } catch (error) {
      throw "Error updating profile image: " + error;
    }
  }

  async getMinDetails(patientId: mongoose.Types.ObjectId): Promise<{
    _id: mongoose.Types.ObjectId;
    fullName: string;
    profileImage: string;
  }> {
    try {
      return await PatientModel.findOne(
        { _id: patientId },
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

  async block(patientId: string): Promise<UpdateResult> {
    return await PatientModel.updateOne(
      { _id: patientId },
      { $set: { isBlocked: true } }
    );
  }

  async unblock(patientId: string): Promise<UpdateResult> {
    return await PatientModel.updateOne(
      { _id: patientId },
      { $set: { isBlocked: false } }
    );
  }

  async getPatientDashboardDetails(): Promise<{
    totalUsers: number;
    activePatients: number;
    blockedPatients: number;
  }> {
    const [totalUsers, activePatients, blockedPatients] = await Promise.all([
      await PatientModel.countDocuments(),
      await PatientModel.countDocuments({ isBlocked: false }),
      await PatientModel.countDocuments({ isBlocked: true }),
    ])

    return {
      totalUsers,
      activePatients,
      blockedPatients,
    }
  }
}
