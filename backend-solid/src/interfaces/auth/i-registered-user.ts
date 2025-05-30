import { Types } from "mongoose";

export interface IRegisteredUser {
    fullName: string;
    email: string;
    mobile: string;
    password: string;
    profileImage: string | null;
}

export interface IRegisteredUserWithPersonal {
    _id: Types.ObjectId;
    personal: IRegisteredUser
    status: {
        isApproved: boolean
    }
}