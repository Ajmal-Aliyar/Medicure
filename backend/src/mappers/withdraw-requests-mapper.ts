import { IWithdrawRequestResponseDTO } from "@/interfaces";
import { IAdmin, IDoctor, IWithdrawRequest } from "@/models";

export class WithdrawRequestMapper {
  static toWithdrawRequestResponse(
    requests: IWithdrawRequest[]
  ): IWithdrawRequestResponseDTO[] {
    return requests.map((rqst: IWithdrawRequest) => ({
      id: String(rqst._id),
      requesterId: String(rqst.requesterId),
      role: rqst.role,
      amount: rqst.amount,
      accountNumber: rqst.accountNumber,
      accountName: rqst.accountName,
      IFSC_Code: rqst.IFSC_Code,
      status: rqst.status,
      requestedAt: rqst.requestedAt,
      ...(rqst.processedAt && { processedAt: rqst.processedAt }),
    }));
  }

  static toWithdrawRequestAdminResponse(
    rqst: IWithdrawRequest, requesterDetails: IDoctor | IAdmin
  ): IWithdrawRequestResponseDTO {
    const isDoctor = rqst.role === 'doctor' && 'professional' in requesterDetails;
    return {
      id: String(rqst._id),
      requester: {
        fullName: requesterDetails.personal.fullName,
        profileImage: requesterDetails.personal.profileImage,
        ...(isDoctor && {
        specialization: (requesterDetails as IDoctor).professional.specialization,
      }),
      },
      requesterId: String(rqst.requesterId),
      role: rqst.role,
      amount: rqst.amount,
      accountNumber: rqst.accountNumber,
      accountName: rqst.accountName,
      IFSC_Code: rqst.IFSC_Code,
      status: rqst.status,
      requestedAt: rqst.requestedAt,
      ...(rqst.processedAt && { processedAt: rqst.processedAt }),
    }
  }

}
