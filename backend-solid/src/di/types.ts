
export const TYPES = {
  //Admin
  AdminDoctorController: Symbol.for("AdminDoctorController"),
  AdminDoctorService: Symbol.for("AdminDoctorService"),

  //Doctor
  DoctorController: Symbol.for("DoctorController"),
  DoctorService: Symbol.for("DoctorService"),
  DoctorScheduleController: Symbol.for("DoctorScheduleController"),
  DoctorScheduleService: Symbol.for("DoctorScheduleService"),
  DoctorSlotService: Symbol.for("DoctorSlotService"),
  DoctorSlotController: Symbol.for("DoctorSlotController"),

  //Patient
  PatientController: Symbol.for("PatientController"),
  PatientService: Symbol.for("PatientService"),

  //Repository
  DoctorRepository: Symbol.for("DoctorRepository"),
  ScheduleRepository: Symbol.for("ScheduleRepository"),
  PatientRepository: Symbol.for("PatientRepository"),
  AdminRepository: Symbol.for("AdminRepository"),
  SlotRepository: Symbol.for("SlotRepository"),

  //Public
  AuthController: Symbol.for("AuthController"),
  AuthService: Symbol.for("AuthService"),
  ScheduleService: Symbol.for("ScheduleService"),
  SlotService: Symbol.for("SlotService"),

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
