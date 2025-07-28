import { FeedbackDetails, IRole, PopulatedFeedbackDetails } from "@/interfaces";

export class FeedbackMapper {
  static toFeedbackDetailsByRole(
    rawFeedbacks: PopulatedFeedbackDetails[],
    role: IRole
  ): FeedbackDetails[] {
    const feedbacks: FeedbackDetails[] = rawFeedbacks.map((a) => ({
      id: a._id.toString(),
      doctor: {
        id: a.doctorId._id.toString(),
        fullName: a.doctorId.personal.fullName,
        profileImage: a.doctorId.personal.profileImage,
        specialization: a.doctorId.professional.specialization,
        languageSpoken: a.doctorId.personal.languageSpoken,
        experience: a.doctorId.professional.yearsOfExperience,
        rating: a.doctorId.rating,
        gender: a.doctorId.personal.gender,
      },
      patient: {
        id: a.patientId._id.toString(),
        fullName: a.patientId.personal.fullName,
        profileImage: a.patientId.personal.profileImage,
        gender: a.patientId.personal.gender || null,
        dob: a.patientId.personal.dob || null,
        mobile: a.patientId.personal.mobile,
        bloodGroup: a.patientId.personal.bloodGroup || null,
      },
      appointmentId: a.appointmentId.toString(),
      comment: a.comment,
      rating: a.rating,
      createdAt: a.createdAt,
    }));

    return feedbacks;
  }
}
