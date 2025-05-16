import { IAppointmentRepository } from "../../repositories/interfaces/IAppointmentRepository";
import { IPatientRepository } from "../../repositories/interfaces/IPatientRepository";
import { ITransactionRepository } from "../../repositories/interfaces/ITransactionRepository";
import { fillMissingDays } from "../../utils/fillDaysUtil";
import { IDashboardServices } from "../interfaces/IDashboardServices";

export class DashboardServices implements IDashboardServices {
  private patientRepository: IPatientRepository;
  private appointmentRepository: IAppointmentRepository;
  private transactionRepository: ITransactionRepository;

  constructor(
    patientRepository: IPatientRepository,
    appointmentRepository: IAppointmentRepository,
    transactionRepository: ITransactionRepository
  ) {
    this.patientRepository = patientRepository;
    this.appointmentRepository = appointmentRepository;
    this.transactionRepository = transactionRepository;
  }

  async getPatientDashboard(): Promise<{
    totalUsers: number;
    activePatients: number;
    blockedPatients: number;
    appointments: number;
  }> {
    try {
      const data = await this.patientRepository.getPatientDashboardDetails();
      const appointments =
        await this.appointmentRepository.getTotalPendingAppointments();
      return { ...data, appointments };
    } catch (error: unknown) {
      console.error("Error fetching approved doctors:", error);
      throw error;
    }
  }

  async getChartDetails(): Promise<{
    "Last 7 Days": { date: string; appointments: number; revenue: number }[];
    "Last 30 Days": { date: string; appointments: number; revenue: number }[];
  }> {
    try {
      const data = await this.transactionRepository.getChartDetails();
      return data
    } catch (error: unknown) {
      console.error("Error fetching approved doctors:", error);
      throw error;
    }
  } 
}
