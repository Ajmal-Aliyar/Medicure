import { model } from "mongoose";
import { IWithdrawSchema } from "./withdrawInterface";
import { WithdrawSchema } from "./withdrawSchema";


export const WithdrawModel = model<IWithdrawSchema>('Withdraw', WithdrawSchema);