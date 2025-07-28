export interface IErrorType {
  name: string;
  email: string;
  mobile: string;
  password: string;
}

export interface IAuthPageProps {
  setAuthStatus: React.Dispatch<React.SetStateAction<string>>;
  setIsChangePassword: React.Dispatch<React.SetStateAction<boolean>>;
  role: string;
}

export interface ISignInResponse {
  data: {
    id: string;
    email: string;
    role: "admin" | "doctor" | "patient";
    isApproved: "pending" | "applied" | "approved" | "rejected";
    fullName: string;
    profileImage: string | null;
  };
}

export interface IVerificationOTPProp {
  isChangePassword: boolean;
  setAuthStatus: React.Dispatch<React.SetStateAction<string>>;
}

export interface IErrorTypeChangepassword {
  newPassword: string;
  confirmPassword: string;
}
export interface IForgotPasswordProps {
  setAuthStatus: React.Dispatch<React.SetStateAction<string>>;
  role: string;
}
