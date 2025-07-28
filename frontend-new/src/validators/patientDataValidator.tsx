import type { PatientProfile } from "@/types/patient";

export const PatientProfileValidation = (data: PatientProfile) => {
    const {personal, contact} = data
    const exclude = ['profileImage','email']
    for (const [key, value] of Object.entries(data)) {
        if (typeof value === 'string' && value.trim() === '' && !exclude.includes(key)) {
            return `${key} cannot be empty`;
        } else if (!exclude.includes(key) && (value === null || value === undefined)) {
            return `${key} cannot be null or undefined`;
        }
    }

    if (!/^\S+@\S+\.\S+$/.test(personal.email)) {
        return 'Invalid email format'
    }

    if (!/^\d{10}$/.test(personal.mobile)) {
        return 'Phone number must be 10 digits'
    }

    if (!/^\d{6}$/.test(contact?.address.pincode)) {
        return 'Pincode must be 6 digits'
    }

    if (!/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(personal.dob)) {
        return 'Date of birth must be in YYYY-MM-DD format'
    }

    const validBloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    if (!validBloodGroups.includes(personal.bloodGroup)) {
        return 'Invalid blood group'
    }

    if (!['Male', 'Female', 'Other'].includes(personal.gender)) {
        return 'Gender must be Male, Female, or Other'
    }

    return false
};
