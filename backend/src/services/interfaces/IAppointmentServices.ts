import { IAppointmentDocument } from "../../repositories/interfaces/IAppointmentRepository"

export interface IAppointmentServices {
    createAppointment({doctorId, patientId, slotId, appointmentDate, status, transactionId}: ICreateAppointment): Promise<IAppointmentDocument>
}


export interface ICreateAppointment {
    doctorId: string, 
    patientId: string, 
    slotId: string, 
    appointmentDate: Date | string, 
    status: string, 
    transactionId: string
}
