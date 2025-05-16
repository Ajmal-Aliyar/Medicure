import mongoose, { UpdateResult } from "mongoose";
import { AppointmentModel } from "../../models/appointment/appointmentModel";
import {
  IAppointmentDocument,
  IAppointmentRepository,
} from "../interfaces/IAppointmentRepository";

export class AppointmentRepository implements IAppointmentRepository {
  async createAppointment(
    doctorId: string,
    patientId: string,
    slotId: string,
    appointmentDate: Date,
    status: string,
    transactionId: string,
    recordId: mongoose.Types.ObjectId
  ): Promise<IAppointmentDocument> {
    const appointment = new AppointmentModel({
      doctorId,
      patientId,
      slotId,
      appointmentDate,
      status,
      transactionId,
      recordId,
    });
    return await appointment.save();
  }

  async getUserAppointments(
    patientId: string,
    page: string,
    skip: number,
    limit: number
  ): Promise<{ appointments: IAppointmentDocument[]; total: number }> {
    const status = page === "pending" ? "Scheduled" : "Completed";
    const appointments = await AppointmentModel.aggregate([
      { $match: { patientId, status } },

      {
        $lookup: {
          from: "doctors",
          let: { doctorIdStr: "$doctorId" },
          pipeline: [
            { $addFields: { doctorIdAsString: { $toString: "$_id" } } },
            {
              $match: {
                $expr: { $eq: ["$doctorIdAsString", "$$doctorIdStr"] },
              },
            },
            { $project: { fullName: 1, profileImage: 1, specialization: 1 } },
          ],
          as: "doctorDetails",
        },
      },

      {
        $lookup: {
          from: "slots",
          let: { slotIdStr: "$slotId" },
          pipeline: [
            { $addFields: { slotIdAsString: { $toString: "$_id" } } },
            { $match: { $expr: { $eq: ["$slotIdAsString", "$$slotIdStr"] } } },
            { $project: { startTime: 1, endTime: 1, avgConsultTime: 1 } },
          ],
          as: "slotDetails",
        },
      },

      {
        $addFields: {
          appointmentIdStr: { $toString: "$_id" },
        },
      },
      {
        $lookup: {
          from: "feedbacks",
          localField: "appointmentIdStr",
          foreignField: "appointmentId",
          as: "feedbackDetails",
        },
      },

      { $unwind: { path: "$doctorDetails", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$slotDetails", preserveNullAndEmptyArrays: true } },
      {
        $unwind: { path: "$feedbackDetails", preserveNullAndEmptyArrays: true },
      },
      { $project: { appointmentIdStr: 0 } },

      { $skip: skip },
      { $limit: limit },
    ]);

    const total = await AppointmentModel.countDocuments({ patientId, status });

    return { appointments, total };
  }

  async getAllAppointmentsForAdmin({
    page = 1,
    limit = 10,
    searchTerm = "",
    selectedDate = "",
    selectedTime = "",
    statusFilter = "",
    sortField = "createdAt",
    sortOrder = "desc",
  }): Promise<{
    appointments: IAppointmentDocument[];
    totalAppointments: number;
  }> {
    const skip = (page - 1) * limit;
    const startOfDay = new Date(selectedDate);
    const endOfDay = new Date(selectedDate);
    endOfDay.setUTCHours(23, 59, 59, 999);
    const result = await AppointmentModel.aggregate([
      {
        $lookup: {
          from: "doctors",
          let: { doctorIdStr: "$doctorId" },
          pipeline: [
            { $addFields: { doctorIdAsString: { $toString: "$_id" } } },
            {
              $match: {
                $expr: { $eq: ["$doctorIdAsString", "$$doctorIdStr"] },
              },
            },
            { $project: { fullName: 1, profileImage: 1, specialization: 1 } },
          ],
          as: "doctorDetails",
        },
      },

      {
        $lookup: {
          from: "slots",
          let: { slotIdStr: "$slotId" },
          pipeline: [
            { $addFields: { slotIdAsString: { $toString: "$_id" } } },
            { $match: { $expr: { $eq: ["$slotIdAsString", "$$slotIdStr"] } } },
            { $project: { startTime: 1, endTime: 1, avgConsultTime: 1 } },
          ],
          as: "slotDetails",
        },
      },

      {
        $lookup: {
          from: "patients",
          let: { patientIdStr: "$patientId" },
          pipeline: [
            { $addFields: { patientIdAsString: { $toString: "$_id" } } },
            {
              $match: {
                $expr: { $eq: ["$patientIdAsString", "$$patientIdStr"] },
              },
            },
            { $project: { fullName: 1, profileImage: 1, phone: 1 } },
          ],
          as: "patientDetails",
        },
      },

      { $unwind: { path: "$doctorDetails", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$slotDetails", preserveNullAndEmptyArrays: true } },
      {
        $unwind: { path: "$patientDetails", preserveNullAndEmptyArrays: true },
      },

      {
        $match: {
          ...(statusFilter ? { status: statusFilter } : {}),
          ...(selectedDate
            ? { appointmentDate: { $gte: startOfDay, $lt: endOfDay } }
            : {}),
          ...(selectedTime ? { "slotDetails.startTime": selectedTime } : {}),
        },
      },

      ...(searchTerm
        ? [
            {
              $match: {
                $or: [
                  {
                    "doctorDetails.fullName": {
                      $regex: searchTerm,
                      $options: "i",
                    },
                  },
                  {
                    "patientDetails.fullName": {
                      $regex: searchTerm,
                      $options: "i",
                    },
                  },
                ],
              },
            },
          ]
        : []),

      {
        $sort: { [sortField]: sortOrder === "desc" ? -1 : 1 },
      },

      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
    ]);

    const totalAppointments = await AppointmentModel.aggregate([
      {
        $lookup: {
          from: "doctors",
          let: { doctorIdStr: "$doctorId" },
          pipeline: [
            { $addFields: { doctorIdAsString: { $toString: "$_id" } } },
            {
              $match: {
                $expr: { $eq: ["$doctorIdAsString", "$$doctorIdStr"] },
              },
            },
            { $project: { fullName: 1, profileImage: 1, specialization: 1 } },
          ],
          as: "doctorDetails",
        },
      },
      {
        $lookup: {
          from: "patients",
          let: { patientIdStr: "$patientId" },
          pipeline: [
            { $addFields: { patientIdAsString: { $toString: "$_id" } } },
            {
              $match: {
                $expr: { $eq: ["$patientIdAsString", "$$patientIdStr"] },
              },
            },
            { $project: { fullName: 1, profileImage: 1, phone: 1 } },
          ],
          as: "patientDetails",
        },
      },

      { $unwind: { path: "$doctorDetails", preserveNullAndEmptyArrays: true } },
      {
        $unwind: { path: "$patientDetails", preserveNullAndEmptyArrays: true },
      },

      {
        $match: {
          ...(statusFilter ? { status: statusFilter } : {}),
          ...(selectedDate
            ? { appointmentDate: { $regex: `^${selectedDate}` } }
            : {}),
          ...(selectedTime ? { "slotDetails.startTime": selectedTime } : {}),
        },
      },

      ...(searchTerm
        ? [
            {
              $match: {
                $or: [
                  {
                    "doctorDetails.fullName": {
                      $regex: searchTerm,
                      $options: "i",
                    },
                  },
                  {
                    "patientDetails.fullName": {
                      $regex: searchTerm,
                      $options: "i",
                    },
                  },
                ],
              },
            },
          ]
        : []),

      {
        $count: "totalAppointments",
      },
    ]);

    return {
      appointments: result,
      totalAppointments:
        totalAppointments.length > 0
          ? totalAppointments[0].totalAppointments
          : 0,
    };
  }

  async appointmentDetails(): Promise<({ fees:{ fees: number }} & IAppointmentDocument)[]> {
    const result = await AppointmentModel.aggregate([
      {
        $lookup: {
          from: "doctors",
          let: { doctorIdStr: "$doctorId" },
          pipeline: [
            { $addFields: { doctorIdAsString: { $toString: "$_id" } } },
            {
              $match: {
                $expr: { $eq: ["$doctorIdAsString", "$$doctorIdStr"] },
              },
            },
            { $project: { fees: 1, _id: 0 } },
          ],
          as: "fees",
        },
      },
      { $unwind: { path: "$fees", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          status: 1,
          fees: 1,
        },
      },
    ]);
    return result;
  }

  async getAllAppointmentsOfDoctor(
    doctorId: string
  ): Promise<
    { patientId: string; roomId: string; status: string; _id: string }[]
  > {
    return await AppointmentModel.find(
      { doctorId },
      { patientId: 1, roomId: 1, status: 1 }
    );
  }

  async cancelAppointmentByTransactionId(transactionId: string): Promise<void> {
    await AppointmentModel.updateOne(
      { transactionId },
      { $set: { status: "Cancelled" } }
    );
  }

  async getTotalPendingAppointments(): Promise<number> {
    return await AppointmentModel.countDocuments({ status: 'Completed'})
  }

  async getAppointmentsBySlotId(
    slotId: string
  ): Promise<IAppointmentDocument[]> {
    return await AppointmentModel.find(
      { slotId },
      { patientId: 1, roomId: 1, status: 1, doctorId: 1, recordId: 1 }
    ).populate("recordId", "isCompleted");
  }

  async consultingCompleted(_id: string): Promise<UpdateResult> {
    return await AppointmentModel.updateOne(
      { _id },
      { $set: { status: "Completed" } }
    );
  }

  async getConsultents(
    _id: string
  ): Promise<{ patientId: string; doctorId: string }> {
    return (
      (await AppointmentModel.findById(_id, {
        doctorId: 1,
        patientId: 1,
      }).lean()) ?? null
    );
  }
}
