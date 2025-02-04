import { IAppointmentDocument, IAppointmentRepository } from "../../repositories/interfaces/IAppointmentRepository";
import { IAppointmentServices, ICreateAppointment } from "../interfaces/IAppointmentServices";


export class AppointmentServices implements IAppointmentServices {
    private appointmentRepository: IAppointmentRepository;

    constructor(appointmentRepository: IAppointmentRepository) {
        this.appointmentRepository = appointmentRepository
    }

    async createAppointment({ doctorId, patientId, slotId, appointmentDate, status, transactionId }: ICreateAppointment): Promise<IAppointmentDocument> {
        try {
            if (!doctorId || !patientId || !slotId || !appointmentDate || !status || !transactionId) {
                console.log(doctorId,patientId,slotId,'dl', appointmentDate, status,'st', transactionId)
                throw new Error("All appointment fields are required.");
            }
            const response = await this.appointmentRepository.createAppointment(
                doctorId, 
                patientId, 
                slotId, 
                appointmentDate, 
                status, 
                transactionId
            );
            if (!response) {
                throw new Error("Failed to create appointment.");
            }
            return response
        } catch (error) {
            console.error("Error creating appointment:", error);
            throw error (error);
        }
    }
    async getUserAppointments(userId: string): Promise<IAppointmentDocument[]> {
        try {
            if (!userId) {
                throw new Error('No user ID provided.');
            }
            return await this.appointmentRepository.getUserAppointments(userId);
        } catch (error: any) {
            throw error
        }
    }
    
    
}