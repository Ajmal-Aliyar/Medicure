import { CardDetails } from "@/interfaces/common/card-details";
import { BloodGroup } from "@/interfaces/common/IBloodGroup";
import { IPatient } from "@/models";

export interface PatientProfileDTO {
    id: string;
    personal: Omit<IPatient['personal'], 'password'>;
    contact: IPatient['contact'];
    status: {
        isBlocked: boolean
    },
    createdAt: Date,
    updatedAt: Date
}

export interface PatientCardDetailsDTO extends CardDetails {
  dob: string | null;
  bloodGroup: BloodGroup | null;
  mobile: string;
}
