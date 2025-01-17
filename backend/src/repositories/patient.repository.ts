import { ICreatePatient } from "../interfaces/patient/patient.interface";
import { PatientModel } from "../models/patient/patient.model"

export class PatientRepository {
    async createUser({fullName, email, phone, password}:ICreatePatient) {
        if (!email) {
            throw new Error('Email cannot be null or empty');
        }
        const existingUser = await PatientModel.findOne({ email });
        if (existingUser) {
            throw new Error('User with this email already exists');
        }
        const user = new PatientModel({ fullName, email, phone, password });
        console.log(user, 'eeee');
        return await user.save();
    }
    
    async findByEmail(email: string) {
        return await PatientModel.findOne({ email });
    }

    async findByID(_id: string) {
        return await PatientModel.findById(_id);
    }

    async changePassword (email: string, password: string) {
        return await PatientModel.updateOne(
            { email },
            { $set: { password } }
        );
    }
}