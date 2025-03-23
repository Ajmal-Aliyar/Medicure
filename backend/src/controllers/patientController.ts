import { NextFunction, Request, Response } from "express";
import { IPatientServices } from "../services/interfaces/IPatientServices";


export class PatientController {
    private patientServices: IPatientServices;

    constructor(patientServices: IPatientServices) {
        this.patientServices = patientServices
        this.getProfile = this.getProfile.bind(this)
        this.updateProfile = this.updateProfile.bind(this)
        this.updateProfileImg = this.updateProfileImg.bind(this)
        this.getTopDoctors = this.getTopDoctors.bind(this)
    }

    async getProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { _id } = req.client
        try {
            console.log('url correct')
            const patientData = await this.patientServices.getProfile(_id)
            res.status(200).json({ patientData });
        } catch (error: any) {
            next(error)
        }
    }

    async updateProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { _id } = req.client
        const { dob, gender, bloodGroup, houseName, street, city, state, country, pincode } = req.body
        try {
            await this.patientServices.updateProfile({ _id, dob, gender, bloodGroup, houseName, street, city, state, country, pincode })
            res.status(200).json({ message: 'Profile updated successfully' });
        } catch (error: any) {
            next(error)
        }
    }

    async updateProfileImg(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { _id } = req.client;
        const { profileImage } = req.body;

        try {
            if (!profileImage) {
                res.status(400).json({ message: 'Profile image is required.' });
                return;
            }
            await this.patientServices.updateProfileImg(_id, profileImage);
            res.status(200).json({ message: 'Profile image updated successfully.' });
        } catch (error) {
            next(error);
        }
    }

    async getTopDoctors(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
          // Parsing query parameters with proper defaults
          const skip = parseInt(req.query.skip as string) || 0;
          const limit = parseInt(req.query.limit as string) || 5;
          const specialization = req.query.specialization as string || null;
          const search = req.query.search as string || null;
          const sort = req.query.sort as string || 'rating';
          const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1; 
          const languageSpoken = req.query.languageSpoken as string || null;
          const yearsOfExperience = req.query.yearsOfExperience ? parseInt(req.query.yearsOfExperience as string) : null;
      
          console.log('Query Params:', { skip, limit, specialization, search, sort, sortOrder, languageSpoken, yearsOfExperience });
      
          const approvedDoctors = await this.patientServices.getTopDoctors(
            skip,
            limit,
            specialization,
            search,
            sort,
            sortOrder,
            languageSpoken,
            yearsOfExperience
          );
      
          res.status(200).json({
            success: true,
            data: approvedDoctors.data,
            hasMore: approvedDoctors.hasMore,
          });
      
        } catch (error: any) {
          console.error('Error fetching approved doctors:', error.message);
          next(error);
        }
      }
      


}