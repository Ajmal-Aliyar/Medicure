import { AppointmentCard, AppointmentDetailsPopulated, PopulatedAppointment, PopulatedAppointmentForRoom } from "@/interfaces";

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
        experience: rawAppointments.doctorId.professional.yearOfExperience,
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
      transactionId: rawAppointments.transactionId
    };

    return appointments;
  }
}
