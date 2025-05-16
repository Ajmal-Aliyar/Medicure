import mongoose, { UpdateResult } from "mongoose";
import {
  IWithdrawRequests,
  IWithdrawSchema,
} from "../../models/withdraw/withdrawInterface";
import { WithdrawModel } from "../../models/withdraw/withdrawModel";
import { IWithdrawRepository } from "../interfaces/IWithdrawRepository";

export class WithdrawRepository implements IWithdrawRepository {
  async createWithdrawRequest(
    data: Partial<IWithdrawSchema>
  ): Promise<IWithdrawSchema> {
    const request = new WithdrawModel(data);
    return await request.save();
  }

  async getWithdrawRequests(
    status: string,
    skip: number,
    limit: number,
    clientId?: string
  ): Promise<{ withdrawRequests: IWithdrawRequests[]; total: number }> {
    try {
      const filterQuery: {
        status?: string;
        role: string;
        recieverId?: string;
      } = { role: "doctor" };
      if (status) {
        filterQuery.status = status;
      }

      if (clientId) {
        filterQuery.recieverId = clientId;
      }

      const withdrawRequests = await WithdrawModel.aggregate([
        { $match: filterQuery },
        { $addFields: { recieverIdObj: { $toObjectId: "$recieverId" } } },
        {
          $lookup: {
            from: "doctors",
            localField: "recieverIdObj",
            foreignField: "_id",
            as: "doctorDetails",
          },
        },
        {
          $project: {
            "doctorDetails.fullName": 1,
            "doctorDetails.profileImage": 1,
            "doctorDetails.specialization": 1,
            amount: 1,
            transactionDate: 1,
            transactionId: 1,
            status: 1,
            updatedAt: 1,
          },
        },
        { $unwind: "$doctorDetails" },
        { $skip: skip },
        { $limit: limit },
      ]);

      const total = await WithdrawModel.find(filterQuery).countDocuments();
      return { withdrawRequests, total };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getWithdrawRequestById(clientId: string): Promise<IWithdrawSchema> {
    return await WithdrawModel.findById(clientId);
  }

  async updateWithdrawRequest(
    clientId: string,
    status: string
  ): Promise<UpdateResult> {
    return await WithdrawModel.updateOne({ _id: clientId }, { status });
  }
}
