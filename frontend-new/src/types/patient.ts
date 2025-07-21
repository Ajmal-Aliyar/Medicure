// export interface IPatientProfile {
//   _id: string;
//   profileImage: string;
//   fullName: string;
//   phone: string;
//   email: string;
//   dob: string;
//   bloodGroup: string;
//   gender: string;
//   medicalHistory: string[];
//   isBlocked: boolean;
//   address: IAddress;
// }
export interface IAddress {
  addressLine: string;
  city: string;
  state: string;
  street: string;
  country: string;
  pincode: string;
}

export interface IPatientProfilePayload {
  profileImage: string;
  fullName: string;
  phone: string;
  email: string;
  dob: string;
  bloodGroup: string;
  gender: string;
  houseName: string;
  street: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

export interface PatientProfile {
  id: string;
  personal: Omit<IPatient["personal"], "password">;
  contact: IPatient["contact"];
  status: IPatient["status"];
}

export interface IPatient {
  id: string;

  personal: {
    profileImage: string | null;
    fullName: string;
    mobile: string;
    email: string;
    gender: "Male" | "Female" | "Other" | "";
    dob: string;
    bloodGroup: string;
    languageSpoken?: string[];
  };

  contact: {
    address: IAddress;
    emergencyContact?: IEmergencyContact;
  };

  status: {
    isBlocked: boolean;
    isVerified: boolean;
    isProfileCompleted: boolean;
    isApproved: boolean;
  };
}

export interface IEmergencyContact {
  name: string;
  relation: string;
  phone: string;
}
