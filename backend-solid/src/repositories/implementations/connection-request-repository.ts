import { IConnectionRequest} from "@/models";
import { BaseRepository } from "../base";
import { ConnectionRequest } from "@/models";
import { IConnectionRequestRepository } from "../interfaces";

export class ConnectionRequestRepository
  extends BaseRepository<IConnectionRequest>
  implements IConnectionRequestRepository
{
  constructor() {
    super(ConnectionRequest);
  }

  
}
