import { IAppointmentDocument } from "../../repositories/interfaces/IAppointmentRepository"

export interface IAppointmentServices {
    createAppointment({doctorId, patientId, slotId, appointmentDate, status, transactionId}: ICreateAppointment): Promise<IAppointmentDocument>
    getUserAppointments(userId: string, page: string, skip: number, limit: number): Promise<{ appointments: IAppointmentDocument[], total: number }>
    getAllAppointmentsOfDoctor(_id: string): Promise<IAppointmentDocument[]>
    getAllAppointments(page: number, limit: number, searchTerm?: string, selectedDate?: string, selectedTime?: string, statusFilter?: string): Promise<{appointments: IAppointmentDocument[], totalAppointments: number}>
    getBookedPatients(slotId: string): Promise<any>
    consultingCompleted(appointmentId: string, slotId: string): Promise<boolean>
    cancelAppointmentByTransactionId(transactionId: string): Promise<void>
    appointmentDetails(): Promise<{ pending: number, profit: number }>
}


export interface ICreateAppointment {
    doctorId: string, 
    patientId: string, 
    slotId: string, 
    appointmentDate: Date | string, 
    status: string, 
    transactionId: string
}
