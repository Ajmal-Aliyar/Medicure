import { AppointmentCard, PopulatedAppointment } from "@/interfaces";

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
    }));

    return appointments;
  }
}
