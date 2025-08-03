import { IWithdrawRequest, WithdrawRequest } from "@/models";
import { BaseRepository } from "../base";
import { IWithdrawRequestRepository } from "../interfaces";

export class WithdrawRequestRepository
  extends BaseRepository<IWithdrawRequest>
  implements IWithdrawRequestRepository
{
  constructor() {
    super(WithdrawRequest);
  }
}
