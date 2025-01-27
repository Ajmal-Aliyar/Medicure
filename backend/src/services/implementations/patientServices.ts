import { IPatientRepository } from "../../repositories/interfaces/IPatientRepository";
import { IPatientServices } from "../interfaces/IPatientServices";
import { IPatientAddress } from "../../types/IPatientInterface";
import { IPatient } from "../../models/patient/patientInterface";
import { deleteCloudinaryImages, extractPublicId } from "../../utils/CloudinaryUtil";
import { IDoctorRepository } from "../../repositories/interfaces/IDoctorRepostory";
import { IDoctor } from "../../models/doctor/doctorInterface";

export class PatientServices implements IPatientServices {
    private patientRepository: IPatientRepository;
    private doctorRepository: IDoctorRepository;

    constructor(patientRepository: IPatientRepository, doctorRepository: IDoctorRepository ) {
        this.patientRepository = patientRepository
        this.doctorRepository = doctorRepository
    }

    async getProfile(_id: string): Promise<Partial<IPatient> | null> {
        if (!_id || typeof _id !== 'string') {
            throw { message: 'The patient ID provided is invalid. Please ensure it is a valid string.' };
        }
        try {
            const patientData: Partial<IPatient> | null = await this.patientRepository.getProfileData(_id);
            console.log(patientData,'patient')
            if (!patientData) {
                throw { message: `No patient found with the ID: ${_id}. Please verify the ID and try again.` };
            }
            return patientData;
        } catch (error) {
            console.error(`Error fetching profile for ID ${_id}:`, error);
            throw { message: 'An error occurred while fetching the patient profile. Please try again later.', statusCode: 500 };
        }
    }

    async updateProfile({ _id, dob, gender, bloodGroup, houseName, street, city, state, country, pincode }): Promise<void> {
        try {
            const address: IPatientAddress = { houseName, street, city, state, country, pincode };
            const updateResult = await this.patientRepository.updateProfile({
                _id, dob, gender, bloodGroup, address
            });
            if (!updateResult) {
                throw new Error('Failed to update profile');
            }
        } catch (error: any) {
            console.error('Error updating profile:', error);
            throw error;
        }
    }

    async updateProfileImg(doctorId: string, newProfileImage: string): Promise<void> {
        try {
            const existingDoctor = await this.patientRepository.findByID(doctorId);
            if (!existingDoctor) {
                throw { message: 'Doctor not found.', statusCode: 404 };
            }
            let deleteId: string | undefined;
            if (existingDoctor.profileImage) {
                try {
                    deleteId = extractPublicId(existingDoctor.profileImage);
                    console.log('Existing image deletion initiated');
                } catch (error) {
                    throw { message: 'Failed to extract public ID for deletion.', statusCode: 500 };
                }
            }
            const result = await this.patientRepository.profileImage({
                _id: doctorId,
                profileImage: newProfileImage,
            });
    
            if (!result) {
                throw { message: 'Failed to update the profile image.', statusCode: 500 };
            }

            if (deleteId) {
                try {
                    await deleteCloudinaryImages([deleteId]);
                    console.log('Old profile image deleted successfully');
                } catch (error) {
                    console.log('failed to delete old image :', error)
                }
            }
        } catch (error) {
            console.error('Error updating profile image:', error);
            throw error.statusCode
                ? error
                : { message: 'An unexpected error occurred. Please try again later.', statusCode: 500 };
        }
    }

   async getTopDoctors(skip: number, limit: number): Promise<{ data: IDoctor[], hasMore: boolean }> {
           try {
               const approvedDoctors = await this.doctorRepository.getTopDoctors(skip, limit);
               console.log(approvedDoctors,'asdfasdf')
   
               if (!approvedDoctors.data.length) {
                   throw new Error('No approved doctors found.');
               }
   
               return approvedDoctors;
           } catch (error: any) {
               console.error('Error fetching approved doctors:', error);
   
               if (error.name === 'MongoError') {
                   throw new Error('Database error occurred while fetching approved doctors.');
               } else if (error instanceof TypeError) {
                   throw new Error('Unexpected data processing error occurred.');
               } else {
                   throw new Error('An unexpected error occurred. Please try again later.');
               }
           }
       }
    
}