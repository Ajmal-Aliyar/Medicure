export interface IDoctorData {
    fullName: string;
    headline: string;
    about: string;
    dob: string;
    gender: string;
    phone: string;
    addressLine: string;
    streetAddress: string;
    specialization: string;
    languageSpoken: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
}

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
