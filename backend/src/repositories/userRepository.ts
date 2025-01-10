import { UserModel } from "../models/userModel"

export class UserRepository {
    async createUser ( fullName: string, email: string, phone: number, password: string) {
        const user = new UserModel({ fullName, email, phone, password})
        return await user.save()
    }

    async findByEmail(email: string) {
        return await UserModel.findOne({ email });
    }
}