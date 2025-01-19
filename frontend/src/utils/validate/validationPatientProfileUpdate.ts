import { IPatientProfilePayload } from "../../types/patient/profileType";

export const PatientProfileValidation = (data: IPatientProfilePayload) => {
    const exclude = ['profileImage','email']
    for (const [key, value] of Object.entries(data)) {
        if (typeof value === 'string' && value.trim() === '' && !exclude.includes(key)) {
            return `${key} cannot be empty`;
        } else if (!exclude.includes(key) && (value === null || value === undefined)) {
            return `${key} cannot be null or undefined`;
        }
    }
    


    if (!/^\S+@\S+\.\S+$/.test(data.email)) {
        return 'Invalid email format'
    }

    if (!/^\d{10}$/.test(data.phone)) {
        return 'Phone number must be 10 digits'
    }

    if (!/^\d{6}$/.test(data.pincode)) {
        return 'Pincode must be 6 digits'
    }

    if (!/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(data.dob)) {
        return 'Date of birth must be in YYYY-MM-DD format'
    }

    const validBloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    if (!validBloodGroups.includes(data.bloodGroup)) {
        return 'Invalid blood group'
    }

    if (!['Male', 'Female', 'Other'].includes(data.gender)) {
        return 'Gender must be Male, Female, or Other'
    }

    return false
};

