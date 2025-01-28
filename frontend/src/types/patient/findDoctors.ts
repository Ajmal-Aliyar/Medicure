export interface IFetchTopDoctors {
    _id:string;
    profileImage: string;
    fullName: string,
    specialization: string; 
    languageSpoken: string;
    yearsOfExperience: number;
    rating: number;
    reviewCount: number;
    fees: number;
}

export interface IDoctorSotDetails {
    _id: string | null;
    startTime: string;
    endTime: string;
    slotLimit: number;
    bookedSlot: number
    avgConsultTime: string;
}