export interface IMedication {
  medicineId: string;
  medicineName: string;
  dosage: string; 
  frequency: string;
  duration: string;
  instructions: string; 
  quantity: number; 
  refills: number;
}

export interface IPrescription {
  _id?: string;
  doctorId: string;
  patientId: string;
  appointmentId: string; 

  medications: IMedication[];
  diagnosis: string[];
  symptoms: string[];
  notes: string;
  
  issuedDate: Date;
  validUntil: Date;
  
  followUpRequired: boolean;
  followUpDate: Date | null;
  allergies: string[]; 
  
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IFormPrescription {
  medications: IMedication[];
  diagnosis: string;
  symptoms: string;
  allergies: string;
  notes: string;

  issuedDate: string;
  validUntil: string;

  followUpRequired: boolean;
  followUpDate: string;
}


export interface IPrescriptionService {
  getPrescriptionDetails(prescriptionId: string): Promise<IPrescription>;
  viewPrescriptionDetails(prescriptionId: string): Promise<IViewPrescription>;
}


export interface IViewPrescription {
  id: string;
  doctor: {
    personal: {
      fullName: string;
      email: string;
      mobile?: string;
      gender?: string;
      profileImage?: string | null;
    };
    professional: {
      registrationNumber?: string;
      specialization?: string;
      yearsOfExperience?: number;
    };
    location?: {
      street?: string;
      city?: string;
      state?: string;
      country?: string;
      pincode?: string;
    };
  };
  patient: {
    personal: {
      fullName: string;
      gender?: string;
      dob?: string;
      email?: string;
      mobile?: string;
      profileImage?: string | null;
      languageSpoken?: string[];
    };
    contact?: {
      address?: {
        street?: string;
        city?: string;
        state?: string;
        country?: string;
        pincode?: string;
      };
    };
  };
  appointment?: {
    appointmentDate: Date;
    appointmentTime: string;
    mode?: string;
    status?: string;
  };

  medications: {
    medicineName: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions: string;
    quantity: number;
    refills?: number;
  }[];

  diagnosis: string[];
  symptoms: string[];
  notes: string;
  allergies: string[];
  issuedDate: Date;
  validUntil: Date;
  followUpRequired: boolean;
  followUpDate: Date | null;
}