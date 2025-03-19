import { InferSchemaType, UpdateResult } from "mongoose";
import { appointmentSchema } from "../../models/appointment/appointmentShema";
import mongoose from "mongoose";


export type IAppointmentDocument = InferSchemaType<typeof appointmentSchema>;

export interface IAppointmentRepository {
    createAppointment (patientId: string, doctorId: string, slotId: string,
         appointmentDate: Date | string, status: string, transactionId: string, recordId: mongoose.Types.ObjectId): Promise<IAppointmentDocument>
    getUserAppointments (patientId: string): Promise<IAppointmentDocument[]>
    getAppointmentsBySlotId(slotId: string): Promise<any>  
    getAllAppointmentsOfDoctor(doctorId: string): Promise<{ patientId: string, roomId: string, status: string, _id: string }[]>
    consultingCompleted(_id: string): Promise<UpdateResult>
    getAllAppointmentsForAdmin(): Promise<IAppointmentDocument[]>
    cancelAppointmentByTransactionId(transactionId: string): Promise<void>
    getConsultents(_id: string): Promise<{patientId:string, doctorId: string}>
}