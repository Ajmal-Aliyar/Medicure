import { Schema } from "mongoose";
import { ISpecialization } from "./specializationInterface";

export const SpecializationSchema: Schema = new Schema<ISpecialization>({
    image: {type: String},
    name: {type: String}
});
