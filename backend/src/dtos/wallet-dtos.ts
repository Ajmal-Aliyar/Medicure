import { IRole } from "@/interfaces";
import { Types } from "mongoose";

export interface WalletDTO {
    ownerId: Types.ObjectId; 
      ownerType: IRole;
      balance: number;
}