export interface IDoctorData {
    fullName: string;
    headline: string;
    about: string;
    dob: string;
    gender: string | null;
    mobile: string;
    street: string;
    specialization: string;
    languageSpoken: string[];
    city: string;
    state: string;
    country: string;
    pincode: string;
}

export interface IProofVerification {
    identityProof?: string | null;
    medicalRegistration?: string | null;
    establishmentProof?: string | null;
}

export interface FilterDoctorSummary {
  id: string;
  fullName: string;
  dob: string | null;
  profileImage: string | null;
  languageSpoken: string[] | null;
  experience: number | null;
  specialization: number | null;
  gender: string;
  profileStatus: string;
  accountStatus: boolean;
  verificationStatus: boolean
  rating: {
    average: number;
    reviewCount: number;
  };
}

export interface DoctorProfileForAdmin {
  profile: {
    fullName: string;
    email: string;
    mobile: string;
    gender: "Male" | "Female" | "Other" | null;
    dob: string | null;
    profileImage: string | null;
    languageSpoken: string[];
    specialization: string | null;
    headline: string | null;
    about: string | null;
    yearsOfExperience: number;
    education: {
      degree: string;
      university: string;
      yearOfCompletion: number;
      _id: string
    }[];
    experience: {
      hospitalName: string;
      role: string;
      startDate: Date;
      endDate: Date;
      description: string;
      _id: string

    }[];
    fees: {
      amount: number | null;
      currency: string;
    };
    rating: {
      average: number | null;
      reviewCount: number;
    };
  };

  documents: {
    identityProof: string | null;
    medicalRegistration: string | null;
    establishmentProof: string | null;
  };

  registration: {
    registrationNumber: string | null;
    registrationCouncil: string | null;
    registrationYear: number | null;
  };

  location: {
    street: string | null;
    city: string | null;
    state: string | null;
    country: string | null;
    pincode: string | null;
  };

  status: {
    isBlocked: boolean;
    isApproved: boolean;
    profileStatus: "pending" | "applied" | "approved" | "rejected";
    isVerified: boolean;
  };

  id: string;
  createdAt: Date;
  updatedAt: Date;
};
