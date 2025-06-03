export const TYPES = {
  //Admin
  AdminDoctorController: Symbol.for("AdminDoctorController"),
  AdminDoctorService: Symbol.for("AdminDoctorService"),

  //Doctor
  DoctorController: Symbol.for("DoctorController"),
  DoctorService: Symbol.for("DoctorService"),

  //Patient
  PatientController: Symbol.for("PatientController"),
  PatientService: Symbol.for("PatientService"),

  //Repository
  DoctorRepository: Symbol.for("DoctorRepository"),
  PatientRepository: Symbol.for("PatientRepository"),
  AdminRepository: Symbol.for("AdminRepository"),

  //Public
  AuthController: Symbol.for("AuthController"),
  AuthService: Symbol.for("AuthService"),

  MediaService: Symbol.for("MediaService"),
  CacheService: Symbol.for("CacheService"),
  EmailService: Symbol.for("EmailService"),
  OtpService: Symbol.for("OtpService"),
  PasswordHasher: Symbol.for("PasswordHasher"),
  RedisClient: Symbol.for("RedisClient"),
  TokenService: Symbol.for("TokenService"),
  EmailTransporter: Symbol.for("EmailTransporter"),
};
