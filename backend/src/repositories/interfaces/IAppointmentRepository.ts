import { InferSchemaType, UpdateResult } from "mongoose";
import { appointmentSchema } from "../../models/appointment/appointmentShema";


export type IAppointmentDocument = InferSchemaType<typeof appointmentSchema>;

export interface IAppointmentRepository {
    createAppointment (patientId: string, doctorId: string, slotId: string, appointmentDate: Date | string, status: string, transactionId: string): Promise<IAppointmentDocument>
    getUserAppointments (patientId: string): Promise<IAppointmentDocument[]>
    getAppointmentsBySlodId(slotId: string): Promise<{patientId:string,roomId: string, status: string, _id: string}[]> 
    consultingCompleted(_id: string): Promise<UpdateResult>
}