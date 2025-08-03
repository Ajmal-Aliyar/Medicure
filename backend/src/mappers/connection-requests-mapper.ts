import { ConnectionRequestListDetails, PopulatedConnectionRequest } from "@/interfaces";

export class ConnectionRequestMapper {
  static toRequestList(
    requests: PopulatedConnectionRequest[]
  ): ConnectionRequestListDetails[] {
    return requests.map((rqst) => ({
      id: String(rqst._id),
      status: rqst.status,
      createdAt: rqst.createdAt,
      updatedAt: rqst.updatedAt,
      doctor: {
        id: String(rqst.doctorId._id),
        fullName: rqst.doctorId.personal.fullName,
        profileImage: rqst.doctorId.personal.profileImage,
      },
      patient: {
        id: String(rqst.patientId._id),
        fullName: rqst.patientId.personal.fullName,
        profileImage: rqst.patientId.personal.profileImage,
      },
    }));
  }
}
