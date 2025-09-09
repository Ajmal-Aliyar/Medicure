import { IConversation} from "@/models";
import { BaseRepository } from "../base";
import { Conversation } from "@/models";
import { FindAllOptions, IConversationRepository } from "../interfaces";


export class ConversationRepository
  extends BaseRepository<IConversation>
  implements IConversationRepository
{
  constructor() {
    super(Conversation);
  }

  async getConversactionsOfUser({
    filter = {},
    skip = 0,
    limit = 10,
    sort = { updatedAt: -1 },
  }: FindAllOptions<IConversation>): Promise<{ data: any[]; total: number }> {
    const aggregatePipeline: any[] = [
      { $match: filter },
      { $sort: sort },
      {
        $facet: {
          data: [
            { $skip: skip },
            { $limit: limit },
            {
              $lookup: {
                from: "doctors",
                localField: "members",
                foreignField: "_id",
                as: "doctorMembers",
              },
            },
            {
              $lookup: {
                from: "patients",
                localField: "members",
                foreignField: "_id",
                as: "patientMembers",
              },
            },
            {
              $lookup: {
                from: "admins",
                localField: "members",
                foreignField: "_id",
                as: "adminMembers",
              },
            },
            {
              $addFields: {
                allMembers: {
                  $concatArrays: ["$doctorMembers", "$patientMembers", "$adminMembers"],
                },
              },
            },
            {
              $project: {
                isGroup: 1,
                name: 1,
                groupImageUrl: 1,
                createdAt: 1,
                members: {
                  $map: {
                    input: "$allMembers",
                    as: "m",
                    in: {
                      fullName: "$$m.personal.fullName",
                      profileImage: "$$m.personal.profileImage",
                      _id: "$$m._id",
                    },
                  },
                },
              },
            },
          ],

          total: [
            { $count: "count" },
          ],
        },
      },

      {
        $addFields: {
          total: { $ifNull: [{ $arrayElemAt: ["$total.count", 0] }, 0] },
        },
      },
    ];

    const [result] = await this._model.aggregate(aggregatePipeline).exec();
    return {
      data: result?.data || [],
      total: result?.total || 0,
    };
  }

  
}
