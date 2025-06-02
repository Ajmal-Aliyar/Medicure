import { IAdminController } from "@/controllers";
import { TYPES } from "@/di/types";
import { inject, injectable } from "inversify";

@injectable()
export class AdminController implements IAdminController {
    constructor(
        @inject(TYPES.AdminController) private readonly adminController: IAdminController
    ){}
}
