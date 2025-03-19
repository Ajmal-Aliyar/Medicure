export interface IMedicalRecord {
    diagnosis: string;
    prescription: string;
    allergy: string;
    dateOfExamination: Date | null;
    isCompleted: boolean;
  }