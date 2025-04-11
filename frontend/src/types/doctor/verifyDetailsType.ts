import { Dispatch, SetStateAction} from "react";

export interface ISlotDetails {
    _id?: string | null;
    startTime: string;
    endTime: string;
    slotLimit: number;
    avgConsultTime: string;
}

export interface IContentProps  {
  handleModal: (val: string) => void
}

export interface IAppointmentSetUpProps  {
    handleModal: (val: string) => void
}

export interface IFileUploaderProps  {
  handleFileChange: (file: File | null, preview: string | null) => void;
  imagePreview: string | null;
};

export interface ImageUploadLoaderProps  {
    count: number;
    maxCount: number;
}

export interface IProfileDetailsFormProps  {
    handleModal: (val: string) => void;
    setLoading: Dispatch<SetStateAction<boolean>>;
};

export interface IModalAnimationProps  {
    children: React.ReactNode;
    onClose?: (val:string) => void;
};

export interface IProfileVerificationFormProps  {
    handleModal: (value: string) => void;
    setLoading: Dispatch<SetStateAction<boolean>>;
};
export interface IVerificationProofs {
    identityProof?: string | null;
    medicalRegistration?: string | null;
    establishmentProof?: string | null;
}

export interface IPutVerificationProofs {
    identityUrl: string | null, 
    medicalUrl?: string | null, 
    establishmentUrl?: string | null
}

export interface IVerficationDetails {
    registrationNumber: string,
    registrationCouncil: string,
    registrationYear: string,
    degree: string,
    university: string,
    yearOfCompletion: string,
    yearsOfExperience: string
}

export interface IFetchAllApprovedDoctors {
    _id: string;
    id: string;
    profileImage: string;
    fullName: string;
    specialization: string;
    rating: string
    reviewCount: string
}