import { Request, Response } from "express";
import { DoctorService } from "../services/implementations/doctorServices";
import { IProfileVerificationRequestBody } from "../types/IDoctorInterface";
import { NextFunction } from "express-serve-static-core";


const doctorService = new DoctorService()

export class DoctorController {

    async getProfileImage(req: Request, res: Response, next: NextFunction) {
        try {
            const { _id } = req.client;
            const profileImage = await doctorService.getProfileImage(_id)
            res.status(200).json({ profileImage: profileImage.profileImage })
        } catch (error) {
            next(error);
        }
    }


    async getProfileDetails(req: Request, res: Response, next: NextFunction) {
        try {
            const { _id } = req.client;
            const doctorData = await doctorService.getProfileDetails(_id)
            res.status(200).json( doctorData )
        } catch (error) {
            next(error);
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
            await doctorService.updateProfileImg(_id, profileImage);
            res.status(200).json({ message: 'Profile image updated successfully.' });
        } catch (error) {
            next(error);
        }
    }

    async updateProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { _id } = req.client;
            const { fullName, headline, about, gender, specialization, languageSpoken, dob, addressLine, streetAddress, city, state, country, pincode } = req.body;
            console.log(req.body, 'asdf')
            await doctorService.updateDoctor(_id, {
                fullName,
                headline,
                about,
                gender,
                specialization,
                languageSpoken,
                dob,
                addressLine,
                streetAddress,
                city,
                state,
                country,
                pincode
            });

            res.status(200).json({ message: 'Profile updated successfully' });
        } catch (error) {
            next(error);
        }
    }



    async getProfileVerificationDetails(req: Request, res: Response): Promise<void> {
        try {
            const _id = req.client._id;
            const doctorProfile = await doctorService.getProfileVerificationDetailsByID(_id);

            if (!doctorProfile) {
                res.status(404).json({ error: 'Doctor profile not found' });
            }

            res.status(200).json(doctorProfile);
        } catch (error: any) {
            console.error(`Error fetching profile verification details: ${error.message}`);
            res.status(500).json({ error: 'An error occurred while fetching profile details.' });
        }
    };

    async getProofVerificationDetails(req: Request, res: Response): Promise<void> {
        try {
            const _id = req.client._id;
            const doctorProfile = await doctorService.getProofVerificationDetailsByID(_id);

            if (!doctorProfile) {
                res.status(404).json({ error: 'Doctor profile not found' });
            }

            res.status(200).json(doctorProfile);
        } catch (error: any) {
            console.error(`Error fetching profile verification details: ${error.message}`);
            res.status(500).json({ error: 'An error occurred while fetching profile details.' });
        }
    };

    async profileVerification(req: Request, res: Response): Promise<void> {
        const { registrationNumber, registrationCouncil, registrationYear, degree,
            university, yearOfCompletion, yearsOfExperience }: IProfileVerificationRequestBody = req.body;

        const _id: string = req.client._id;

        try {
            await doctorService.profileVerification({
                _id, registrationNumber, registrationCouncil, registrationYear,
                degree, university, yearOfCompletion, yearsOfExperience
            });
            res.status(200).json({ message: 'Profile verification details updated successfully' });
        } catch (error: any) {
            console.error(`Error during profile verification: ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    }

    async verificationProofs(req: Request, res: Response): Promise<void> {
        const { establishmentProof, identityProof, medicalRegistration } = req.body
        const _id: string = req.client._id
        try {
            await doctorService.verificationProofs(_id, establishmentProof, identityProof, medicalRegistration)
            res.status(200).json({ message: 'Verification proofs uploaded successfully' });
        } catch (error: any) {
            console.error(`Error during document proofs uploading: ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    }

    async submitDoctorVerification(req: Request, res: Response): Promise<void> {
        const { _id }: { _id: string } = req.client

        try {
            const status = await doctorService.submitDoctorVerification(_id)
            res.status(200).json({ status })
        } catch (error: any) {
            res.status(404).json({ error: error.message })
        }
    }

    async getDoctorsDetails(req: Request, res: Response, next: NextFunction) {
        try {
            const doctorDetails = await doctorService.getAllDoctors()
            res.status(200).json(doctorDetails)
        } catch (error: unknown) {
            next(error)
        }
    }

}