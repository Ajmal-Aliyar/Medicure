export interface IDoctorType {
  personal: {
    fullName: string;
    email: string;
    mobile: string;
    gender: string;
    dob: string;
    profileImage: string | null;
    languageSpoken: string[];
  };

  professional: {
    registrationNumber: string;
    registrationCouncil: string;
    registrationYear: number;
    specialization: string;
    headline: string;
    about: string;
    yearsOfExperience: number;
    education: IEducation[];
    experience: IExperience[];
    fees: {
      amount: number;
      currency: string;
    };
    documents: IDocument;
  };

  location: IAddress;

  status: {
    accountStatus: {
      isBlocked: boolean;
      reason: string | null;
    };
    profile: {
      isApproved: boolean;
      reviewStatus: "pending" | "applied" | "approved" | "rejected";
      reviewComment: string | null;
    };
    verification: {
      isVerified: boolean;
      verifiedAt: Date;
    };
  };
  id: string;
//   fullName: string;
//   email: string;
//   phone: string;
//   password: string;
//   gender: "Male" | "Female";
//   profileImage: string;
//   dob: string;
//   registrationNumber: string;
//   registrationCouncil: string;
//   registrationYear: number;
//   identityProof: string;
//   establishmentProof: string;
//   medicalRegistration: string;
//   about: string;
//   educationDetails: IEducation;
//   education: IEducation[];
//   experience: IExperience[];
//   headline: string;
//   address: IAddress;
//   specialization: string;
//   yearsOfExperience: number;
//   languageSpoken: string;
//   fees: number;
//   isBlocked: boolean;
//   isProfileCompleted: boolean;
//   isApproved: boolean;
//   createdAt: Date;
//   updatedAt: Date;
}

export interface IEducation {
  degree: string;
  university: string;
  yearOfCompletion: number;
}

export interface IExperience {
  place: string;
  year: string;
  experience: number;
}

export interface IAddress {
    addressLine: string;
    city: string;
    state: string;
    street: string;
    country: string;
    pincode: string;
}

export interface IDocument {
  identityProof: string;
  medicalRegistration: string;
  establishmentProof: string;
}
