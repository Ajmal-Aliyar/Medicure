import { AppointmentModel } from "../../models/appointment/appointmentModel";
import { IAppointmentDocument, IAppointmentRepository } from "../interfaces/IAppointmentRepository";



export class AppointmentRepository implements IAppointmentRepository {

    async createAppointment (patientId: string, doctorId: string, slotId: string,appointmentDate: Date, status: string, transactionId: string): Promise<IAppointmentDocument> {
        const appointment =  new AppointmentModel({doctorId, patientId, slotId, appointmentDate, status, transactionId})
        return await appointment.save()
    }


}