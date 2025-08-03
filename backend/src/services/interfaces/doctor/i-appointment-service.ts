export interface IDoctorAppointmentService {
  markAppointmentInProgress(roomId: string, doctorId: string): Promise<void>;
  markAppointmentCompleted(
    roomId: string,
    doctorId: string
  ): Promise<void>
}
