import { Types } from "mongoose";

export interface IRegisteredUser {
  fullName: string;
  email: string;
  password: string;
  profileImage: string | null;
}

export interface IRegisteredUserWithPersonal {
  _id: Types.ObjectId;
  personal: IRegisteredUser;
  status: {
    profile: {
      isApproved: boolean;
      reviewStatus: "pending" | "applied" | "approved" | "rejected";
      reviewComment: string | null;
    };
  };
}
