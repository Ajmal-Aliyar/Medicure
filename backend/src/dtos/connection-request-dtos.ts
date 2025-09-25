import { IConnectionRequestStatus } from "@/interfaces";

export interface ConnectionRequestListDetailsDTO {
  id: string;
  status: IConnectionRequestStatus;
  createdAt: Date;
  updatedAt: Date;
  doctor: {
    id: string;
    fullName: string;
    profileImage: string;
  };
  patient: {
    id: string;
    fullName: string;
    profileImage: string;
  };
}