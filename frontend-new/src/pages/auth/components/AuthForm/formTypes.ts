export type AuthField =
  | "fullName"
  | "email"
  | "mobile"
  | "password"
  | "confirmPassword"
  | "changePassword"

export interface AuthFormProps {
  fields: AuthField[];
  onSubmit: (data: Record<string, string>) => void;
  submitText?: string;
}
