import { Schema } from "mongoose";
import { IAdmin } from "./adminInterface";

export const Admin: Schema = new Schema<IAdmin>({
    email: { type: String, required: true},
    password: { type: String, required: true}
});
