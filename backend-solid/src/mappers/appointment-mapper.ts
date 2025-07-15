import { AppointmentCard, AppointmentDetailsPopulated, AppointmentPageDetails, PopulatedAppointment, PopulatedAppointmentForRoom } from "@/interfaces";
import { IMedication, IPrescription, ITransaction } from "@/models";


export class AppointmentMapper {
  
  static toAppointmentsCard(rawAppointments: PopulatedAppointment[]) {
    const appointments: AppointmentCard[] = rawAppointments.map((a) => ({
      id: a._id.toString(),
      appointmentDate: a.appointmentDate,
      startTime: a.startTime,
      endTime: a.endTime,
      status: a.status,
      appointmentType: a.appointmentType,
      doctor: {
        id: a.doctorId._id.toString(),
        name: a.doctorId.personal.fullName,
        profileImage: a.doctorId.personal.profileImage,
        specialization: a.doctorId.professional.specialization,
      },
      patient: {
        id: a.patientId._id.toString(),
        name: a.patientId.personal.fullName,
        profileImage: a.patientId.personal.profileImage,
        age: a.patientId.personal.age,
      },
      feedbackId: a.feedbackId || null,
      roomId: a.roomId
    }));

    return appointments;
  }

static toAppointmentPopulated(rawAppointments: PopulatedAppointmentForRoom): AppointmentDetailsPopulated {
  const appointments = {
      id: rawAppointments._id.toString(),
      appointmentDate: rawAppointments.appointmentDate,
      startTime: rawAppointments.startTime,
      endTime: rawAppointments.endTime,
      status: rawAppointments.status,
      appointmentType: rawAppointments.appointmentType,
      doctor: {
        id: rawAppointments.doctorId._id.toString(),
        fullName: rawAppointments.doctorId.personal.fullName,
        profileImage: rawAppointments.doctorId.personal.profileImage,
        specialization: rawAppointments.doctorId.professional.specialization,
        languageSpoken: rawAppointments.doctorId.personal.languageSpoken, 
        experience: rawAppointments.doctorId.professional.yearsOfExperience,
        rating: rawAppointments.doctorId.rating, 
        gender: rawAppointments.doctorId.personal.gender
      },
      patient: {
        id: rawAppointments.patientId._id.toString(),
        fullName: rawAppointments.patientId.personal.fullName,
        profileImage: rawAppointments.patientId.personal.profileImage,
        gender: rawAppointments.patientId.personal.gender || null,
        dob: rawAppointments.patientId.personal.dob || null,
        mobile: rawAppointments.patientId.personal.mobile, 
        bloodGroup: rawAppointments.patientId.personal.bloodGroup || null,
      },
      roomId: rawAppointments.roomId,
      createdAt: rawAppointments.createdAt,
      transactionId: rawAppointments.transactionId,
      feedbackId: rawAppointments.feedbackId || null
    };

    return appointments;
  }

  static toReturnAppointmentPageDetails(
  rawAppointment: PopulatedAppointmentForRoom,
  transaction: ITransaction,
  prescription: IPrescription | null
): AppointmentPageDetails {
  return {
    id: rawAppointment._id.toString(),
    appointmentDate: rawAppointment.appointmentDate,
    startTime: rawAppointment.startTime,
    endTime: rawAppointment.endTime,
    status: rawAppointment.status,
    appointmentType: rawAppointment.appointmentType,
    roomId: rawAppointment.roomId,
    createdAt: rawAppointment.createdAt,

    doctor: {
        id: rawAppointment.doctorId._id.toString(),
        fullName: rawAppointment.doctorId.personal.fullName,
        profileImage: rawAppointment.doctorId.personal.profileImage,
        specialization: rawAppointment.doctorId.professional.specialization,
        languageSpoken: rawAppointment.doctorId.personal.languageSpoken, 
        experience: rawAppointment.doctorId.professional.yearsOfExperience,
        rating: rawAppointment.doctorId.rating, 
        gender: rawAppointment.doctorId.personal.gender
      },
      patient: {
        id: rawAppointment.patientId._id.toString(),
        fullName: rawAppointment.patientId.personal.fullName,
        profileImage: rawAppointment.patientId.personal.profileImage,
        gender: rawAppointment.patientId.personal.gender || null,
        dob: rawAppointment.patientId.personal.dob || null,
        mobile: rawAppointment.patientId.personal.mobile, 
        bloodGroup: rawAppointment.patientId.personal.bloodGroup || null,
      },

    transaction: {
      transactionId: transaction.transactionId,
      amount: transaction.amount,
      status: transaction.status,
      type: transaction.type,
      createdAt: transaction.createdAt,
    },

    prescription: prescription
      ? {
          id: '',
          prescriptionNumber: prescription.prescriptionNumber,
          diagnosis: prescription.diagnosis,
          symptoms: prescription.symptoms,
          medications: prescription.medications.map((med: IMedication) => ({
            medicineId: med.medicineId,
            medicineName: med.medicineName,
            dosage: med.dosage,
            frequency: med.frequency,
            duration: med.duration,
            instructions: med.instructions,
            quantity: med.quantity,
            refills: med.refills,
          })),
          notes: prescription.notes,
          issuedDate: prescription.issuedDate,
          validUntil: prescription.validUntil,
          followUpRequired: prescription.followUpRequired,
          followUpDate: prescription.followUpDate ?? null,
          allergies: prescription.allergies || [],
        }
      : undefined,
  };
}

}

