import { NextFunction, Request, Response } from "express";
import { IAppointmentServices } from "../services/interfaces/IAppointmentServices";

export class AppointmentController {
  private appointmentServices: IAppointmentServices;

  constructor(appointmentServices: IAppointmentServices) {
    this.appointmentServices = appointmentServices;

    this.createAppointment = this.createAppointment.bind(this);
    this.getUserAppointments = this.getUserAppointments.bind(this);
    this.getBookedPatients = this.getBookedPatients.bind(this);
    this.finishedConsulting = this.finishedConsulting.bind(this);
    this.getAllAppointments = this.getAllAppointments.bind(this);
    this.getAllAppointmentsOfDoctor =
      this.getAllAppointmentsOfDoctor.bind(this);
    this.appointmentDetails = this.appointmentDetails.bind(this);
  }

  async createAppointment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const {
        doctorId,
        patientId,
        appointmentDate,
        slotId,
        status,
        transactionId,
      } = req.body;
      if (
        !doctorId ||
        !patientId ||
        !appointmentDate ||
        !slotId ||
        !status ||
        !transactionId
      ) {
        res
          .status(400)
          .json({
            message: "All fields are required for creating an appointment.",
          });
      }

      await this.appointmentServices.createAppointment({
        doctorId,
        patientId,
        slotId,
        appointmentDate,
        status,
        transactionId,
      });

      res.status(201).json({ message: "Appointment created successfully." });
    } catch (error: unknown) {
      console.error("Error creating appointment:", error);
      next(error);
    }
  }

  async getUserAppointments(req: Request, res: Response, next: NextFunction) {
    try {
      const _id = req.client ? req.client._id : "";
      const page = (req.query.page as string) || "pending";
      const skip = parseInt(req.query.skip as string) || 0;
      const limit = parseInt(req.query.limit as string) || 5;

      const userAppointmentsList =
        await this.appointmentServices.getUserAppointments(
          _id,
          page,
          skip,
          limit
        );
      res.status(201).json(userAppointmentsList);
    } catch (error: unknown) {
      next(error);
    }
  }

  async getAllAppointments(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        page = 1,
        limit = 5,
        searchTerm,
        selectedDate,
        selectedTime,
        statusFilter,
      } = req.query;
      const userAppointmentsList =
        await this.appointmentServices.getAllAppointments(
          Number(page),
          Number(limit),
          searchTerm as string,
          selectedDate as string,
          selectedTime as string,
          statusFilter as string
        );
      res.status(200).json(userAppointmentsList);
    } catch (error) {
      next(error);
    }
  }

  async getAllAppointmentsOfDoctor(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { _id } = req.client;
      const bookedPatientsData =
        await this.appointmentServices.getAllAppointmentsOfDoctor(_id);
      res.status(201).json({ bookedPatientsData });
    } catch (error: unknown) {
      next(error);
    }
  }

  async getBookedPatients(req: Request, res: Response, next: NextFunction) {
    try {
      const { slotId } = req.params;

      const bookedPatientsData =
        await this.appointmentServices.getBookedPatients(slotId);
      res.status(200).json({ bookedPatientsData });
    } catch (error: unknown) {
      next(error);
    }
  }

  async finishedConsulting(req: Request, res: Response, next: NextFunction) {
    try {
      const { appointmentId, slotId } = req.params;
      const status = await this.appointmentServices.consultingCompleted(
        appointmentId,
        slotId
      );
      res.status(200).json({ status });
    } catch (error: unknown) {
      next(error);
    }
  }

  async appointmentDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.appointmentServices.appointmentDetails();
      res.status(200).json(data);
    } catch (error: unknown) {
      next(error);
    }
  }
}
