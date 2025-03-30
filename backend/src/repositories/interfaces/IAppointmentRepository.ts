import { InferSchemaType, UpdateResult } from "mongoose";
import { appointmentSchema } from "../../models/appointment/appointmentShema";
import mongoose from "mongoose";


export type IAppointmentDocument = InferSchemaType<typeof appointmentSchema>;

export interface IAppointmentRepository {
    createAppointment (patientId: string, doctorId: string, slotId: string,
         appointmentDate: Date | string, status: string, transactionId: string, recordId: mongoose.Types.ObjectId): Promise<IAppointmentDocument>
    getUserAppointments (patientId: string, page: string, skip: number, limit: number): Promise<{ appointments: IAppointmentDocument[], total: number }>
    getAppointmentsBySlotId(slotId: string): Promise<any>  
    getAllAppointmentsOfDoctor(doctorId: string): Promise<{ patientId: string, roomId: string, status: string, _id: string }[]>
    consultingCompleted(_id: string): Promise<UpdateResult>
    getAllAppointmentsForAdmin({page, limit, searchTerm, selectedDate, selectedTime, statusFilter }: {page: number, limit: number, searchTerm?: string, selectedDate?: string, selectedTime?: string, statusFilter?: string}): Promise<{appointments: IAppointmentDocument[], totalAppointments: number}>
    cancelAppointmentByTransactionId(transactionId: string): Promise<void>
    getConsultents(_id: string): Promise<{patientId:string, doctorId: string}>
    appointmentDetails(): Promise<any>
}