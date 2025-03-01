import { UpdateResult } from "mongoose";
import { AppointmentModel } from "../../models/appointment/appointmentModel";
import { IAppointmentDocument, IAppointmentRepository } from "../interfaces/IAppointmentRepository";

export class AppointmentRepository implements IAppointmentRepository {

  async createAppointment(doctorId: string, patientId: string, slotId: string, appointmentDate: Date, status: string, transactionId: string): Promise<IAppointmentDocument> {
    const appointment = new AppointmentModel({ doctorId, patientId, slotId, appointmentDate, status, transactionId });
    return await appointment.save();
  }

  async getUserAppointments(patientId: string): Promise<IAppointmentDocument[]> {
    const result = await AppointmentModel.aggregate([
      { $match: { patientId } },

      {
        $lookup: {
          from: "doctors",
          let: { doctorIdStr: "$doctorId" },
          pipeline: [
            { $addFields: { doctorIdAsString: { $toString: "$_id" } } },
            { $match: { $expr: { $eq: ["$doctorIdAsString", "$$doctorIdStr"] } } },
            { $project: { fullName: 1, profileImage: 1, specialization: 1 } }
          ],
          as: "doctorDetails"
        }
      },

      {
        $lookup: {
          from: "slots",
          let: { slotIdStr: "$slotId" },
          pipeline: [
            { $addFields: { slotIdAsString: { $toString: "$_id" } } },
            { $match: { $expr: { $eq: ["$slotIdAsString", "$$slotIdStr"] } } },
            { $project: { startTime: 1, endTime: 1, avgConsultTime: 1 } }
          ],
          as: "slotDetails"
        }
      },

      { $unwind: { path: "$doctorDetails", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$slotDetails", preserveNullAndEmptyArrays: true } }
    ]);

    return result;
  }

  async getAllAppointmentsForAdmin(): Promise<IAppointmentDocument[]> {
    const result = await AppointmentModel.aggregate([

      {
        $lookup: {
          from: "doctors",
          let: { doctorIdStr: "$doctorId" },
          pipeline: [
            { $addFields: { doctorIdAsString: { $toString: "$_id" } } },
            { $match: { $expr: { $eq: ["$doctorIdAsString", "$$doctorIdStr"] } } },
            { $project: { fullName: 1, profileImage: 1, specialization: 1 } }
          ],
          as: "doctorDetails"
        }
      },

      {
        $lookup: {
          from: "slots",
          let: { slotIdStr: "$slotId" },
          pipeline: [
            { $addFields: { slotIdAsString: { $toString: "$_id" } } },
            { $match: { $expr: { $eq: ["$slotIdAsString", "$$slotIdStr"] } } },
            { $project: { startTime: 1, endTime: 1, avgConsultTime: 1 } }
          ],
          as: "slotDetails"
        }
      },

      {
        $lookup: {
          from: "patients",
          let: { patientIdStr: "$patientId" },
          pipeline: [
            { $addFields: { patientIdAsString: { $toString: "$_id" } } },
            { $match: { $expr: { $eq: ["$patientIdAsString", "$$patientIdStr"] } } },
            { $project: { fullName: 1, profileImage: 1, phone: 1 } }
          ],
          as: "patientDetails"
        }
      },

      { $unwind: { path: "$doctorDetails", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$slotDetails", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$patientDetails", preserveNullAndEmptyArrays: true } }
    ]);

    return result;
  }

  async getAllAppointmentsOfDoctor(doctorId: string): Promise<{ patientId: string, roomId: string, status: string, _id: string }[]> {
    return await AppointmentModel.find({ doctorId }, { patientId: 1, roomId: 1, status: 1 });
  }

  async cancelAppointmentByTransactionId(transactionId: string): Promise<void> {
    await AppointmentModel.updateOne({transactionId},{$set:{status: 'Cancelled'}})
  }

  async getAppointmentsBySlotId(slotId: string): Promise<{ patientId: string, roomId: string, status: string, _id: string }[]> {
    return await AppointmentModel.find({ slotId }, { patientId: 1, roomId: 1, status: 1 });
  }

  async consultingCompleted(_id: string): Promise<UpdateResult> {
    return await AppointmentModel.updateOne({ _id }, { $set: { status: 'Completed' } });
  }

}
