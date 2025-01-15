import { DoctorRepository } from "../repositories/doctorRepository";
import { IProfileVerificationInput } from "../interfaces/doctorInterface";
import { deleteCloudinaryImages, extractPublicId} from "../utils/CloudinaryUtil"

const doctorRepository = new DoctorRepository()

export class DoctorService {

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
            throw new Error(`Error fetching doctor profile verification details: ${error.message}`);
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
            throw new Error(`Error fetching doctor profile verification details: ${error.message}`);
        }
    };

    async profileVerification({
        _id ,
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
            throw new Error(`Error during profile verification: ${error.message}`);
        }
    }

    async verificationProofs(_id: string, establishmentProof: string | null, identityProof: string | null, medicalRegistration: string | null) {
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


}