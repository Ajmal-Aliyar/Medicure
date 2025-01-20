import { authorizedUserResponse } from "../implementations/authServices";

export interface IAdminServices {
    signIn(email: string, password: string, role: string): Promise<authorizedUserResponse> 
}