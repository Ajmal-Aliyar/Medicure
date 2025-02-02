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
    
}