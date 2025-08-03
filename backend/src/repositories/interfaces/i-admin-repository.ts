import { IAdmin } from "@/models";
import { IBaseRepository } from "./i-base-repository";

export interface IAdminRepository extends IBaseRepository<IAdmin> {
    findByEmail(email: string): Promise<IAdmin | null> 
}