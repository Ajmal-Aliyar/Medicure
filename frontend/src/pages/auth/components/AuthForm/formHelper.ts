import type { AuthField } from "./formTypes";


export const labels: Record<AuthField, string> = {
  fullName: "Full Name",
  email: "Email",
  mobile: "Mobile",
  password: "Password",
  changePassword: "Change Password",
  confirmPassword: "Confirm Password",
};

export const types: Record<AuthField, string> = {
  fullName: "text",
  email: "email",
  mobile: "text",
  password: "password",
  changePassword: "Change Password",
  confirmPassword: "Confirm Password",
};
