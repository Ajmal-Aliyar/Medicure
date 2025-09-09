import { IConnectionRequest} from "@/models";
import { BaseRepository } from "../base";
import { ConnectionRequest } from "@/models";
import { FindAllOptions, IConnectionRequestRepository } from "../interfaces";
import { PopulatedConnectionRequest } from "@/interfaces";

export class ConnectionRequestRepository
  extends BaseRepository<IConnectionRequest>
  implements IConnectionRequestRepository
{
  constructor() {
    super(ConnectionRequest);
  }

  async getAllRequests({ 
      filter = {},
      skip = 0,
      limit = 10,
      sort = { createdAt: -1 },
    }: FindAllOptions<IConnectionRequest>): Promise<{
      requests: PopulatedConnectionRequest[];
      total: number;
    }> {
      const [requests, total] = await Promise.all([
        this._model
          .find(filter)
          .skip(skip)
          .limit(limit)
          .sort(sort)
          .populate("doctorId", "personal.fullName personal.profileImage")
          .populate("patientId", "personal.fullName personal.profileImage")
          .lean< PopulatedConnectionRequest[]>(),  
        this._model.countDocuments(filter),
      ]);
      return {
        requests,
        total,
      }
  }
}
