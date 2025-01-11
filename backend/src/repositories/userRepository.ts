import { UserModel } from "../models/userModel"

export class UserRepository {
    async createUser(fullName: string, email: string, phone: number, password: string) {
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
}