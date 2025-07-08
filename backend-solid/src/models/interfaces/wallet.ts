import { IRole } from "@/interfaces";
import { Types } from "mongoose";

export interface IWallet {
  ownerId: Types.ObjectId; 
  ownerType: IRole;
  balance: number;
}
