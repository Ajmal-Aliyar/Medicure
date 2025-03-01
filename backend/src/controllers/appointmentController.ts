import { NextFunction, Request, Response } from "express";
import { IAppointmentServices } from "../services/interfaces/IAppointmentServices";




export class AppointmentController {
    private appointmentServices: IAppointmentServices

    constructor( appointmentServices: IAppointmentServices ) {
        this. appointmentServices = appointmentServices

        this.createAppointment = this.createAppointment.bind(this)
        this.getUserAppointments = this.getUserAppointments.bind(this)
        this.getBookedPatients = this.getBookedPatients.bind(this)
        this.finishedConsulting = this.finishedConsulting.bind(this)
        this.getAllAppointments = this.getAllAppointments.bind(this)
        this.getAllAppointmentsOfDoctor = this.getAllAppointmentsOfDoctor.bind(this)
    }

    async createAppointment(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { doctorId, patientId, appointmentDate, slotId, status, transactionId } = req.body;
            if (!doctorId || !patientId || !appointmentDate || !slotId || !status || !transactionId) {
                res.status(400).json({ message: "All fields are required for creating an appointment." });
            }
    
            await this.appointmentServices.createAppointment({ doctorId, patientId, slotId, appointmentDate, status, transactionId });
    
            res.status(201).json({ message: "Appointment created successfully." });
        } catch (error: any) {
            console.error("Error creating appointment:", error);
            next(error); 
        }
    }

    async getUserAppointments(req: Request, res: Response, next: NextFunction) {
        try {
            const { _id } = req.client
            
            const userAppointmentsList = await this.appointmentServices.getUserAppointments(_id)
            res.status(201).json({userAppointmentsList})
        } catch(error: any) {
            next(error)
        }
    }

    async getAllAppointments(req: Request, res: Response, next: NextFunction) {
        try {
            const userAppointmentsList = await this.appointmentServices.getAllAppointments()
            res.status(201).json({userAppointmentsList})
        } catch(error: any) {
            next(error)
        }
    }

    async getAllAppointmentsOfDoctor(req: Request, res: Response, next: NextFunction) {
        try {
            const { _id } = req.client
            const bookedPatientsData = await this.appointmentServices.getAllAppointmentsOfDoctor(_id)
            res.status(201).json({bookedPatientsData})
        } catch(error: any) {
            next(error)
        }
    }

    async getBookedPatients(req: Request, res: Response, next: NextFunction) {
        try {
            const { slotId } = req.params

            const bookedPatientsData = await this.appointmentServices.getBookedPatients(slotId)
            res.status(200).json({bookedPatientsData})

        } catch (error: any) {
            next(error)
        }
    }

    async finishedConsulting(req: Request, res: Response, next: NextFunction) {
        try {
            const { appointmentId, slotId } = req.params
            const status = await this.appointmentServices.consultingCompleted(appointmentId, slotId)
            res.status(200).json({status})
        } catch (error: any) {
            next(error)
        }
    }
    
}