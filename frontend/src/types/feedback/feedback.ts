import { IDoctorData } from "../../components/doctor/profile/validationProfile";

export interface IFetchFeedbacks {
    doctorDetails: IDoctorData;
    patientId: string;
    rating: number;
    comments: string;
}
