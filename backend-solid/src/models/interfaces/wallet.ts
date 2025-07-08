import { IRole } from "@/interfaces";
import { Document, Types } from "mongoose";

export interface IWallet extends Document {
  ownerId: Types.ObjectId; 
  ownerType: IRole;
  balance: number;
}
