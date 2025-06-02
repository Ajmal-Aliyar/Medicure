export const TYPES = {
  DoctorRepository: Symbol.for("DoctorRepository"),
  DoctorService: Symbol.for("DoctorService"),
  DoctorController: Symbol.for("DoctorController"),
  
  PatientRepository: Symbol.for("PatientRepository"),
  
  AuthService: Symbol.for("AuthService"),
  AuthController: Symbol.for("AuthController"),

  AdminRepository: Symbol.for('AdminRepository'),
  AdminService: Symbol.for('AdminService'),
  AdminController: Symbol.for('AdminController'),

  MediaService: Symbol.for("MediaService"),
  CacheService: Symbol.for("CacheService"),
  EmailService: Symbol.for("EmailService"),
  OtpService: Symbol.for("OtpService"),
  PasswordHasher: Symbol.for("PasswordHasher"),
  RedisClient: Symbol.for('RedisClient'),
  TokenService: Symbol.for('TokenService'),
  EmailTransporter: Symbol.for('EmailTransporter'),
};

