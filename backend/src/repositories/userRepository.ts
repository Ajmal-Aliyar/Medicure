import { ICreateUser } from "../interfaces/doctorInterface";
import { UserModel } from "../models/userModel"

export class UserRepository {
    async createUser({fullName, email, phone, password}:ICreateUser) {
        if (!email) {
            throw new Error('Email cannot be null or empty');
        }
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            throw new Error('User with this email already exists');
        }
        const user = new UserModel({ fullName, email, phone, password });
        console.log(user, 'eeee');
        return await user.save();
    }
    
    async findByEmail(email: string) {
        return await UserModel.findOne({ email });
    }

    async findByID(_id: string) {
        return await UserModel.findById(_id);
    }

    async changePassword (email: string, password: string) {
        return await UserModel.updateOne(
            { email },
            { $set: { password } }
        );
    }
}