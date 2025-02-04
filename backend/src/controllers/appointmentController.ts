import { NextFunction, Request, Response } from "express";
import { IAppointmentServices } from "../services/interfaces/IAppointmentServices";




export class AppointmentController {
    private appointmentServices: IAppointmentServices

    constructor( appointmentServices: IAppointmentServices ) {
        this. appointmentServices = appointmentServices

        this.createAppointment = this.createAppointment.bind(this)
        this.getUserAppointments = this.getUserAppointments.bind(this)
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

            console.log(userAppointmentsList,'response')
            res.status(201).json({userAppointmentsList})
        } catch(error: any) {
            next(error)
        }
    }
    
}