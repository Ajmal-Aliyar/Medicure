export interface IFetchAppointmentResponse {
    _id: string;
    doctorId: string;
    patientId: string
    slotId: string;
    appointmentDate: string
    status: string;
    transactionId: string;
    createdAt: string
    doctorDetails: IDoctorDetails
    slotDetails: ISlotDetails
}

export interface IDoctorDetails {
    _id: string;
    fullName: string;
    specialization: string;
    profileImage: string;
}

export interface ISlotDetails {
    _id: string;
    startTime: string;
    endTime: string;
    avgConsultTime: string;
}
