import type { IDoctorData } from "@/types/doctor";

const nonEditable = ['profileImage','email','registrationNumber','password']

export const validateDoctorData = (data: IDoctorData): string[] => {
    const errors: string[] = [];

    Object.entries(data).forEach(([key, value]) => {
        if (typeof value === 'string' && !value.trim() && !nonEditable.includes(key)) {
            errors.push(`${key.replace(/([A-Z])/g, ' $1').trim()} is required.`);
        }
    });

    return errors;
};
