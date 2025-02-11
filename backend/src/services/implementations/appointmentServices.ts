import { IAppointmentDocument, IAppointmentRepository } from "../../repositories/interfaces/IAppointmentRepository";
import { IPatientRepository } from "../../repositories/interfaces/IPatientRepository";
import { IAppointmentServices, ICreateAppointment } from "../interfaces/IAppointmentServices";


export class AppointmentServices implements IAppointmentServices {
    private appointmentRepository: IAppointmentRepository;
    private patientRepository: IPatientRepository;

    constructor(appointmentRepository: IAppointmentRepository, patientRepository: IPatientRepository) {
        this.appointmentRepository = appointmentRepository
        this.patientRepository = patientRepository
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
    
    async getBookedPatients(slotId: string): Promise<any> {
        try {
          const appointments = await this.appointmentRepository.getAppointmentsBySlodId(slotId);
      console.log(appointments)
          if (appointments.length === 0) {
            return [];
          }

          const userDetails = await Promise.all(
            appointments.map(async (appointment) => {
              const patientDetails = await this.patientRepository.getProfileData(appointment.patientId);
              console.log(appointment.roomId)
              return {patientDetails, roomId: appointment.roomId}
            })
          );
          return userDetails;
        } catch (error) {
          console.error("Error fetching booked patients:", error);
          throw error;
        }
      }
      
    
}