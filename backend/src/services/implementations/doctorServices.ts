import { DoctorRepository } from "../../repositories/implementations/doctorRepository";
import { IProfileVerificationInput, IUpdateProfileRepository } from "../../types/IDoctorInterface";
import { deleteCloudinaryImages, extractPublicId } from "../../utils/CloudinaryUtil"
import { IAddress } from "../../models/doctor/doctorInterface"; 

const doctorRepository = new DoctorRepository()

export class DoctorService {

    async getProfileDetails(_id: string) {
        try {
            return await doctorRepository.findByID(_id)
        } catch (error) {
            throw error;
        }
    }

    async updateProfileImg(doctorId: string, newProfileImage: string): Promise<void> {
        try {
            const existingDoctor = await doctorRepository.findByID(doctorId);
    
            if (existingDoctor?.profileImage) {
                const deleteId = await extractPublicId(existingDoctor.profileImage)
                await deleteCloudinaryImages([deleteId]);
                console.log('existing image deleted')
            }

            await doctorRepository.profileImage({ _id: doctorId, profileImage: newProfileImage });
        } catch (error) {
            console.error('Error updating profile image:', error);
            throw new Error('Failed to update profile image. Please try again.');
        }
    }
    
    

    async updateDoctor(
        _id: string, 
        { addressLine, streetAddress, city, state, gender,
            specialization,
            languageSpoken, 
            dob, country, pincode, about, headline, fullName }: IUpdateProfileRepository
    ): Promise<void> {
        try {
            const address: IAddress = {
                addressLine,
                streetAddress,
                city,
                state,
                country,
                pincode
            };

            await doctorRepository.updateDoctor(_id, { fullName, headline, about, address, gender, specialization,languageSpoken, dob, });
            
        } catch (error) {
            return error
        }
    }
    

    async getProfileVerificationDetailsByID(_id: string) {
        try {
            const doctorData = await doctorRepository.findByID(_id);

            if (!doctorData) {
                throw new Error(`Doctor with id ${_id} does not exist`);
            }

            const { registrationNumber, registrationCouncil, registrationYear, educationDetails, yearsOfExperience } = doctorData;
            const { degree, university, yearOfCompletion } = educationDetails;

            return {
                registrationNumber,
                registrationCouncil,
                registrationYear,
                yearsOfExperience,
                degree, university, yearOfCompletion
            };
        } catch (error: any) {
            console.error(`Error fetching doctor profile verification details for ${_id}: ${error.message}`);
            return error
        }
    };

    async getProofVerificationDetailsByID(_id: string) {
        try {
            const doctorData = await doctorRepository.findByID(_id);

            if (!doctorData) {
                throw new Error(`Doctor with email ${_id} does not exist`);
            }

            const { identityProof, medicalRegistration, establishmentProof } = doctorData;

            return { identityProof, medicalRegistration, establishmentProof };
        } catch (error: any) {
            console.error(`Error fetching doctor profile verification details for ${_id}: ${error.message}`);
            return error
        }
    };

    async profileVerification({
        _id,
        registrationNumber,
        registrationCouncil,
        registrationYear,
        degree,
        university,
        yearOfCompletion,
        yearsOfExperience
    }: IProfileVerificationInput): Promise<void> {
        try {
            const updateResult = await doctorRepository.updateProfileData({
                _id,
                registrationNumber,
                registrationCouncil,
                registrationYear,
                yearsOfExperience,
                degree,
                university,
                yearOfCompletion
            });

            if (!updateResult || updateResult.modifiedCount === 0) {
                throw new Error('Profile update failed, please try again.');
            }

            console.log('Profile successfully verified and updated.');
        } catch (error: any) {
            console.error(`Error during profile verification: ${error.message}`);
            return error
        }
    }

    async verificationProofs(_id: string, establishmentProof: string | null, identityProof: string | null, medicalRegistration: string | null): Promise<void> {
        try {
            if (!_id) {
                throw new Error('Email is required for verification update.');
            }

            const doctorData = await doctorRepository.findByID(_id);
            if (!doctorData) {
                throw new Error('Doctor not found with the provided email.');
            }
            const publicIdsToDelete: string[] = [];

            if (identityProof && doctorData.identityProof) {
                publicIdsToDelete.push(extractPublicId(doctorData.identityProof));
            }
            if (medicalRegistration && doctorData.medicalRegistration) {
                publicIdsToDelete.push(extractPublicId(doctorData.medicalRegistration));
            }
            if (establishmentProof && doctorData.establishmentProof) {
                publicIdsToDelete.push(extractPublicId(doctorData.establishmentProof));
            }

            if (publicIdsToDelete.length > 0) {
                await deleteCloudinaryImages(publicIdsToDelete);
            } else {
                console.log('No images to delete.');
            }

            await doctorRepository.updateVerficationProofs(
                _id,
                establishmentProof,
                identityProof,
                medicalRegistration
            );

            console.log('Profile successfully updated proofs.');
        } catch (error: any) {
            console.error(`Error during uploading proofs document: ${error.message}`);
            throw new Error(`Error during uploading proofs document: ${error.message}`);
        }
    }

    async submitDoctorVerification(id: string): Promise<boolean> {
        try {
            const doctorData = await doctorRepository.findByID(id)
            const { registrationNumber, registrationCouncil, registrationYear, educationDetails, yearsOfExperience,
                establishmentProof, identityProof, medicalRegistration } = doctorData

            if (registrationNumber && registrationCouncil && registrationYear && educationDetails && yearsOfExperience &&
                establishmentProof && identityProof && medicalRegistration) {
                await doctorRepository.updatekProfileComplete(id)
                return true
            } else {
                return false
            }

        } catch (error: any) {
            return error
        }
    }

    async updateFees({ _id, fees }: { _id: string, fees: number }) {
        try {
            const update = await doctorRepository.updateFees(_id, fees)
            if (!update) {
                throw new Error('Fees not updated')
            }
        } catch (error: any) {
            return error
        }
    }

    async getFees(doctorId: string) {
        try {
            return await doctorRepository.getFees(doctorId)
        } catch (error: any) {
            return error
        }
    }


}