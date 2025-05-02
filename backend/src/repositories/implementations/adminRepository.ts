import { IAdminRepository } from "../interfaces/IAdminRepository";
import { IAdmin } from "../../models/admin/adminInterface";
import { AdminModel } from "../../models/admin/adminModel";

export class AdminRepository implements IAdminRepository {
  async findByEmail(email: string): Promise<IAdmin> {
    return await AdminModel.findOne({ email });
  }

  async findByID(id: string): Promise<IAdmin> {
    return await AdminModel.findById(id);
  }
}
