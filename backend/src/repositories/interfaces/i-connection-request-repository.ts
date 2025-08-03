import { IConnectionRequest } from "@/models";
import { FindAllOptions, IBaseRepository } from "./i-base-repository";
import { PopulatedConnectionRequest } from "@/interfaces";

export interface IConnectionRequestRepository extends IBaseRepository<IConnectionRequest> {
    getAllRequests(options: FindAllOptions<IConnectionRequest>): Promise<{
        requests: PopulatedConnectionRequest[];
        total: number;
      }>
}