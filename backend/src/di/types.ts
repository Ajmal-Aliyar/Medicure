
export const TYPES = {
  //Withdraw Requests 
  WithdrawRequestRepository: Symbol.for("WithdrawRequestRepository"),
  WithdrawRequestService: Symbol.for("WithdrawRequestService"),
  WithdrawRequestController: Symbol.for("WithdrawRequestController"),
  DoctorWithdrawRequestService: Symbol.for("DoctorWithdrawRequestService"),
  DoctorWithdrawRequestController: Symbol.for("DoctorWithdrawRequestController"),
  AdminWithdrawRequestService: Symbol.for("AdminWithdrawRequestService"),
  AdminWithdrawRequestController: Symbol.for("AdminWithdrawRequestController"),

  //Appointment
  AppointmentRepository: Symbol.for("AppointmentRepository"),
  AppointmentService: Symbol.for("AppointmentService"),
  DoctorAppointmentService: Symbol.for("DoctorAppointmentService"),
  PatientAppointmentService: Symbol.for("PatientAppointmentService"),
  AppointmentController: Symbol.for("AppointmentController"),
  //Double-check - Appointment
  AdminAppointmentController: Symbol.for("AdminAppointmentController"),
  PatientAppointmentController: Symbol.for("PatientAppointmentController"),
  DoctorAppointmentController: Symbol.for("DoctorAppointmentController"),
  
  
  //Feedback
  FeedbackRepository: Symbol.for("FeedbackRepository"),
  PatientFeedbackService: Symbol.for("PatientFeedbackService"),
  FeedbackService: Symbol.for("FeedbackService"),
  FeedbackController: Symbol.for("FeedbackController"),
  PatientFeedbackController: Symbol.for("PatientFeedbackController"),

  
  //Presciption
  PrescriptionRepository: Symbol.for("PrescriptionRepository"),
  DoctorPrescriptionService: Symbol.for("DoctorPrescriptionService"),
  PrescriptionService: Symbol.for("PrescriptionService"),
  PrescriptionController: Symbol.for("PrescriptionController"),
  DoctorPrescriptionController: Symbol.for("DoctorPrescriptionController"),


  //medical records
  MedicalRecordRepository: Symbol.for("MedicalRecordRepository"),
  DoctorMedicalRecordService: Symbol.for("DoctorMedicalRecordService"),
  PatientMedicalRecordService: Symbol.for("PatientMedicalRecordService"),
  PatientMedicalRecordController: Symbol.for("PatientMedicalRecordController"),
  DoctorMedicalRecordController: Symbol.for("DoctorMedicalRecordController"),
  
  
  //Connection request
  ConnectionRequestRepository: Symbol.for("ConnectionRequestRepository"),
  ConnectionRequestService: Symbol.for("ConnectionRequestService"),
  ConnectionRequestController: Symbol.for("ConnectionRequestController"),


  //Conversation
  ConversationRepository: Symbol.for("ConversationRepository"),
  ConversationService: Symbol.for("ConversationService"),
  ConversationController: Symbol.for("ConversationController"),


  //Message
  MessageRepository: Symbol.for("MessageRepository"),
  MessageService: Symbol.for("MessageService"),
  MessageController: Symbol.for("MessageController"),


  // Wallet
  WalletRepository: Symbol.for("WalletRepository"),
  WalletService: Symbol.for("WalletService"),
  WalletController: Symbol.for("WalletController"),


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
  AdminPatientController: Symbol.for("AdminPatientController"),
  PatientDoctorController: Symbol.for("PatientDoctorController"),
  PatientService: Symbol.for("PatientService"),
  AdminPatientService: Symbol.for("AdminPatientService"),
  PatientDoctorService: Symbol.for("PatientDoctorService"),
  PatientSlotController: Symbol.for("PatientSlotController"),
  PatientSlotService: Symbol.for("PatientSlotService"),
  
  //Repository
  DoctorRepository: Symbol.for("DoctorRepository"),
  ScheduleRepository: Symbol.for("ScheduleRepository"),
  PatientRepository: Symbol.for("PatientRepository"),
  AdminRepository: Symbol.for("AdminRepository"),
  SlotRepository: Symbol.for("SlotRepository"),
  SpecializationRepository: Symbol.for("SpecializationRepository"),
  
  //Public
  AuthController: Symbol.for("AuthController"),
  AuthService: Symbol.for("AuthService"),
  ScheduleService: Symbol.for("ScheduleService"),
  SlotService: Symbol.for("SlotService"),
  SpecializationService: Symbol.for("SpecializationService"),
  SpecializationController: Symbol.for(
    "SpecializationController"
  ),
  PaymentService: Symbol.for("PaymentService"),
  PaymentController: Symbol.for("PaymentController"),
  SlotController: Symbol.for("SlotController"),
  TransactionRepository: Symbol.for("TransactionRepository"),
  TransactionService: Symbol.for("TransactionService"),
  TransactionController: Symbol.for("TransactionController"),
  AdminTransactionService: Symbol.for("AdminTransactionService"),
  AdminTransactionController: Symbol.for("AdminTransactionController"),

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
