import { IAdmin } from "../../models/admin/adminInterface";

export interface IAdminRepository {
    findByEmail( email: string): Promise<IAdmin>;
    findByID(_id: string): Promise<IAdmin>;
}