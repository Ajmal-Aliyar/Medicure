export interface IErrorType {
    name: string,
    email: string,
    mobile: string,
    password: string,
}

export interface IAuthPageProps {
    handleAuth: (value: boolean) => void;
    handleForgotPassword: (value: boolean) => void;
    role: string
};

export interface ISignInResponse {
    data: {
        _id: string;
        email: string;
        role: 'doctor' | 'user' | 'admin';
    };
};

export interface IVerificationOTPProp {
  handleAuth: (value: boolean) => void;
  forgotPassword: boolean;
  handleChangePassword:(value: boolean) => void
}

export interface IErrorTypeChangepassword {
  newPassword: string;
  confirmPassword: string;
}
export interface IForgotPasswordProps {
  handleChangePassword: (value: boolean) => void;
  role:string;
}
