import { DoctorRepository } from "../repositories/implementations/doctorRepository";
import { PatientRepository } from "../repositories/implementations/patientRepository";
const patientRepositry = new PatientRepository();
const doctorRepository = new DoctorRepository()

export const checkBlocked = async (userId: string, role: string) => {
    if (role === 'admin') return false
    const repo = role === 'user' ? patientRepositry : doctorRepository
    const user = await repo.findByID(userId);

  if (user.isBlocked) {
    return true;
  }

  return false;
};
