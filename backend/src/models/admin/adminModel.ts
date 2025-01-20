import { IAdmin } from "./adminInterface";
import mongoose from "mongoose";
import { Admin } from "./adminSchema";


export const AdminModel = mongoose.model<IAdmin>('Admin', Admin);
