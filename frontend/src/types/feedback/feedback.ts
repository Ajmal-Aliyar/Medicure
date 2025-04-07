

export interface IFetchFeedbacks {
    createdAt: string;
    _id: string;
    details: IFeedbackDetails;
    patientId: string;
    rating: number;
    comments: string;
}

export interface IFeedbackDetails {
    profileImage: string;
    fullName: string;
    specialization: string;
}