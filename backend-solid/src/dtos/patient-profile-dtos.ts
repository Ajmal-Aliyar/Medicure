import { IPatient } from "@/models";

export interface PatientProfileDto {
    personal: Omit<IPatient['personal'], 'password'>;
    contact: IPatient['contact'];
}

