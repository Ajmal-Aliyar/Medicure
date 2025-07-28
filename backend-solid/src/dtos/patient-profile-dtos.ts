import { IPatient } from "@/models";

export interface PatientProfileDto {
    id: string;
    personal: Omit<IPatient['personal'], 'password'>;
    contact: IPatient['contact'];
}

