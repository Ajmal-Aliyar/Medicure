import { Request, Response } from "express";
import { DoctorService } from "../services/doctorServices";

const doctorService = new DoctorService()

export class DoctorController {
    
    async verifyProfile (req:Request, res:Response) {
        console.log('doctor verify controller')
        await doctorService.verifyProfile()
    }

    async profileVerification (req:Request, res:Response) {
        const {registrationNumber, registrationCouncil, registrationYear, degree, college, yearOfCompletion, yearOfExperience, handsome } = req.body
        console.log('profile verification',req.body?.formData)
    }
}