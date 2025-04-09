import mongoose from "mongoose";
import {
  IAppointmentDocument,
  IAppointmentRepository,
} from "../../repositories/interfaces/IAppointmentRepository";
import { IChatRepository } from "../../repositories/interfaces/IChatRepository";
import { IPatientRepository } from "../../repositories/interfaces/IPatientRepository";
import { ISlotRepository } from "../../repositories/interfaces/ISlotRepository";
import {
  IAppointmentServices,
  ICreateAppointment,
} from "../interfaces/IAppointmentServices";
import { IMedicalRecordRepository } from "../../repositories/interfaces/IMedicatlRepository";
import { IPatient } from "../../models/patient/patientInterface";

export class AppointmentServices implements IAppointmentServices {
  private appointmentRepository: IAppointmentRepository;
  private patientRepository: IPatientRepository;
  private slotRepository: ISlotRepository;
  private chatRepository: IChatRepository;
  private medicalRecordRepository: IMedicalRecordRepository;

  constructor(
    appointmentRepository: IAppointmentRepository,
    patientRepository: IPatientRepository,
    slotRepository: ISlotRepository,
    chatRepository: IChatRepository,
    medicalRecordRepository: IMedicalRecordRepository
  ) {
    this.appointmentRepository = appointmentRepository;
    this.patientRepository = patientRepository;
    this.slotRepository = slotRepository;
    this.chatRepository = chatRepository;
    this.medicalRecordRepository = medicalRecordRepository;
  }

  async createAppointment({
    doctorId,
    patientId,
    slotId,
    appointmentDate,
    status,
    transactionId,
  }: ICreateAppointment): Promise<IAppointmentDocument> {
    try {
      if (
        !doctorId ||
        !patientId ||
        !slotId ||
        !appointmentDate ||
        !status ||
        !transactionId
      ) {
        throw new Error("All appointment fields are required.");
      }
      const medicalRecord = await this.medicalRecordRepository.createRecord({
        doctorId,
        patientId,
      });
      const response = await this.appointmentRepository.createAppointment(
        doctorId,
        patientId,
        slotId,
        appointmentDate,
        status,
        transactionId,
        medicalRecord._id
      );
      if (!response) {
        throw new Error("Failed to create appointment.");
      }
      return response;
    } catch (error) {
      console.error("Error creating appointment:", error);
      throw error(error);
    }
  }

  async getUserAppointments(
    userId: string,
    page: string,
    skip: number,
    limit: number
  ): Promise<{ appointments: IAppointmentDocument[]; total: number }> {
    try {
      if (!userId) {
        throw new Error("No user ID provided.");
      }
      return await this.appointmentRepository.getUserAppointments(
        userId,
        page,
        skip,
        limit
      );
    } catch (error: unknown) {
      throw error;
    }
  }

  async getAllAppointments(
    page: number,
    limit: number,
    searchTerm?: string,
    selectedDate?: string,
    selectedTime?: string,
    statusFilter?: string
  ): Promise<{
    appointments: IAppointmentDocument[];
    totalAppointments: number;
  }> {
    try {
      return this.appointmentRepository.getAllAppointmentsForAdmin({
        page,
        limit,
        searchTerm,
        selectedDate,
        selectedTime,
        statusFilter,
      });
    } catch (error: unknown) {
      throw error;
    }
  }

  async getAllAppointmentsOfDoctor(
    _id: string
  ): Promise<
    {
      patientDetails: Partial<IPatient> | null;
      roomId: string;
      status: string;
      appointmentId: string;
    }[]
  > {
    try {
      const appointments =
        await this.appointmentRepository.getAllAppointmentsOfDoctor(_id);

      if (appointments.length === 0) {
        return [];
      }

      const userDetails = await Promise.all(
        appointments.map(async (appointment) => {
          const patientDetails = await this.patientRepository.getProfileData(
            appointment.patientId
          );
          return {
            patientDetails,
            roomId: appointment.roomId,
            status: appointment.status,
            appointmentId: appointment._id,
          };
        })
      );
      return userDetails;
    } catch (error) {
      console.error("Error fetching booked patients:", error);
      throw error;
    }
  }

  async getBookedPatients(
    slotId: string
  ): Promise<
    {
      patientDetails: Partial<IPatient> | null;
      roomId: string;
      status: string;
      appointmentId: string;
    }[]
  > {
    try {
      const appointments =
        await this.appointmentRepository.getAppointmentsBySlotId(slotId);

      if (appointments.length === 0) {
        return [];
      }

      const userDetails = await Promise.all(
        appointments.map(async (appointment) => {
          const patientDetails = await this.patientRepository.getProfileData(
            appointment.patientId
          );
          return {
            patientDetails,
            roomId: appointment.roomId,
            status: appointment.status,
            appointmentId: String(appointment._id),
            recordId: appointment.recordId,
          };
        })
      );
      return userDetails;
    } catch (error) {
      console.error("Error fetching booked patients:", error);
      throw error;
    }
  }

  async consultingCompleted(
    appointmentId: string,
    slotId: string
  ): Promise<boolean> {
    try {
      const [updateAppointment, updateSlot] = await Promise.all([
        this.appointmentRepository.consultingCompleted(appointmentId),
        this.slotRepository.consultingCompleted(slotId),
      ]);

      if (!updateAppointment) throw new Error("Failed to update appointment");
      if (!updateSlot) throw new Error("Failed to update slot");

      const appointment = await this.appointmentRepository.getConsultents(
        appointmentId
      );
      if (!appointment) throw new Error("Appointment details not found");

      const { doctorId, patientId } = appointment;

      const doctorObjectId = new mongoose.Types.ObjectId(doctorId);
      const patientObjectId = new mongoose.Types.ObjectId(patientId);

      const chatExists = await this.chatRepository.isChatExists({
        doctorId: doctorObjectId,
        patientId: patientObjectId,
      });

      if (!chatExists) {
        await this.chatRepository.createChat([doctorObjectId, patientObjectId]);
      }

      return true;
    } catch (error) {
      console.error("Error in consultingCompleted:", error);
      throw error;
    }
  }

  async cancelAppointmentByTransactionId(transactionId: string): Promise<void> {
    try {
      await this.appointmentRepository.cancelAppointmentByTransactionId(
        transactionId
      );
    } catch (error: unknown) {
      throw error;
    }
  }

  async appointmentDetails(): Promise<{ pending: number; profit: number }> {
    try {
      const appointments =
        await this.appointmentRepository.appointmentDetails();

      const pending = appointments.reduce((acc, item) => {
        if (item.status === "Scheduled") {
          return acc + item.fees.fees;
        }
        return acc;
      }, 0);

      const profit = appointments.reduce((acc, item) => {
        if ((item.status = "Completed")) {
          return acc + item.fees.fees;
        }
        return acc;
      }, 0);

      return { pending, profit: (profit * 10) / 100 };
    } catch (error: unknown) {
      throw error;
    }
  }
}
