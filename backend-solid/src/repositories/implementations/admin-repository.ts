import { AdminModel, IAdmin } from "@/models";
import { BaseRepository, IAdminRepository } from "@/repositories";


export class AdminRepository extends BaseRepository<IAdmin> implements IAdminRepository {
    constructor() {
        super(AdminModel)
    }
}