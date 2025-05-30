export interface IErrorType {
    name: string,
    email: string,
    mobile: string,
    password: string,
}

export interface IAuthPageProps {
    setAuthStatus:  React.Dispatch<React.SetStateAction<string>>
    setIsChangePassword: React.Dispatch<React.SetStateAction<boolean>>
    role: string
};

export interface ISignInResponse {
    data: {
        _id: string;
        email: string;
        role: 'doctor' | 'patient' | 'admin';
        message: string
    };
};

export interface IVerificationOTPProp {
  isChangePassword: boolean;
  setAuthStatus:  React.Dispatch<React.SetStateAction<string>>
}

export interface IErrorTypeChangepassword {
  newPassword: string;
  confirmPassword: string;
}
export interface IForgotPasswordProps {
  setAuthStatus:  React.Dispatch<React.SetStateAction<string>>
  role:string;
}
