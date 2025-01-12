import { DoctorModel } from "../models/doctorModel";

export class DoctorRepository {
    static async createDoctor(fullName: string, email: string, phone: number, password: string) {
        if (!email) {
            throw new Error('Email cannot be null or empty');
        }
        const existingUser = await DoctorModel.findOne({ email });
        if (existingUser) {
            throw new Error('User with this email already exists');
        }
        const doctor = new DoctorModel({ fullName, email, phone, password });
        console.log(doctor, 'doctor');
        return await doctor.save();
    }
    
    static async findByEmail(email: string) {
        return await DoctorModel.findOne({ email });
    }

    static async changePassword (email: string, password: string) {
        return await DoctorModel.updateOne(
            { email },
            { $set: { password } }
        );
    }
}