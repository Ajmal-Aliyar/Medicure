import mongoose from "mongoose";
import { IAppointment } from "./appointmentInterface";
import { appointmentSchema } from "./appointmentShema";

export const AppointmentModel = mongoose.model<IAppointment>('appointment', appointmentSchema);

