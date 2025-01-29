import { Schema } from "mongoose";
import { ISpecialization } from "./specializationInterface";

export const SpecializationSchema = new Schema<ISpecialization>({
    image: {type: String, required: true},
    name: {type: String, required: true},
    description: {type: String, required: true}
});
