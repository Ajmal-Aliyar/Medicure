export const TYPES = {
  //Admin
  AdminDoctorController: Symbol.for("AdminDoctorController"),
  AdminDoctorService: Symbol.for("AdminDoctorService"),
  AdminAppointmentController: Symbol.for("AdminAppointmentController"),

  //Doctor
  DoctorController: Symbol.for("DoctorController"),
  DoctorService: Symbol.for("DoctorService"),
  DoctorScheduleController: Symbol.for("DoctorScheduleController"),
  DoctorScheduleService: Symbol.for("DoctorScheduleService"),
  DoctorSlotService: Symbol.for("DoctorSlotService"),
  DoctorSlotController: Symbol.for("DoctorSlotController"),
  DoctorAppointmentController: Symbol.for("DoctorAppointmentController"),

  //Patient
  PatientController: Symbol.for("PatientController"),
  PatientDoctorController: Symbol.for("PatientDoctorController"),
  PatientService: Symbol.for("PatientService"),
  PatientDoctorService: Symbol.for("PatientDoctorService"),
  PatientSlotController: Symbol.for("PatientSlotController"),
  PatientSlotService: Symbol.for("PatientSlotService"),
  PatientAppointmentController: Symbol.for("PatientAppointmentController"),
  PatientAppointmentService: Symbol.for("PatientAppointmentService"),

  //Repository
  DoctorRepository: Symbol.for("DoctorRepository"),
  ScheduleRepository: Symbol.for("ScheduleRepository"),
  PatientRepository: Symbol.for("PatientRepository"),
  AdminRepository: Symbol.for("AdminRepository"),
  SlotRepository: Symbol.for("SlotRepository"),
  AppointmentRepository: Symbol.for("AppointmentRepository"),
  SpecializationRepository: Symbol.for("SpecializationRepository"),

  //Public
  AuthController: Symbol.for("AuthController"),
  AuthService: Symbol.for("AuthService"),
  ScheduleService: Symbol.for("ScheduleService"),
  SlotService: Symbol.for("SlotService"),
  PatientSpecializationService: Symbol.for("PatientSpecializationService"),
  PatientSpecializationController: Symbol.for(
    "PatientSpecializationController"
  ),
  PaymentService: Symbol.for("PaymentService"),
  PaymentController: Symbol.for("PaymentController"),
  AppointmentService: Symbol.for("AppointmentService"),
  SlotController: Symbol.for("SlotController"),
  TransactionRepository: Symbol.for("TransactionRepository"),
  TransactionService: Symbol.for("TransactionService"),
  WalletRepository: Symbol.for("WalletRepository"),
  WalletService: Symbol.for("WalletService"),
  TransactionController: Symbol.for("TransactionController"),

  MediaService: Symbol.for("MediaService"),
  CacheService: Symbol.for("CacheService"),
  EmailService: Symbol.for("EmailService"),
  OtpService: Symbol.for("OtpService"),
  PasswordHasher: Symbol.for("PasswordHasher"),
  RedisClient: Symbol.for("RedisClient"),
  TokenService: Symbol.for("TokenService"),
  SlotCronJob: Symbol.for("SlotCronJob"),
  EmailTransporter: Symbol.for("EmailTransporter"),
};
