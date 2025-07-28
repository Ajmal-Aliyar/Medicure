export interface PublicDoctorDetails {
  id: string;
  fullName: string;
  gender: string;
  dob: string | null;
  profileImage: string | null;
  languageSpoken: string[] | null;
  specialization: string | null;
  experience: number | null;
  verificationStatus: boolean
  profileStatus?: string;
  accountStatus?: boolean;
  rating: {
    average: number;
    reviewCount: number;
  };
}