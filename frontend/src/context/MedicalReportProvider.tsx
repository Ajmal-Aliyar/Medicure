import { createContext, Dispatch, ReactNode, useContext, useReducer } from "react";

interface MedicalRecordState {
    patientID: string;
    doctorID: string;
    diagnosis: string;
    prescription: string;
    allergy: string;
    dateOfExamination: Date | null;
  }

const initialState: MedicalRecordState = {
    patientID: "",
    doctorID: "",
    diagnosis: "",
    prescription: "",
    allergy: "",
    dateOfExamination: null,
  };
  
  const medicalRecordReducer = (state: MedicalRecordState, action: MedicalRecordAction): MedicalRecordState => {
    switch (action.type) {
      case "SET_FIELD":
        return { ...state, [action.field]: action.value };
      case "SET_DATE":
        return { ...state, dateOfExamination: action.date };
      case "RESET":
        return initialState;
      default:
        return state;
    }
  };
  
  type MedicalRecordAction =
  | { type: "SET_FIELD"; field: keyof MedicalRecordState; value: string }
  | { type: "SET_DATE"; date: Date | null }
  | { type: "RESET" };



  const MedicalRecordContext = createContext<MedicalRecordContextType | undefined>(undefined);

  interface MedicalRecordContextType {
    state: MedicalRecordState;
    dispatch: Dispatch<MedicalRecordAction>; 
  }
  
  interface MedicalRecordProviderProps {
    children: ReactNode;
  }
  
  export function MedicalRecordProvider({ children }: MedicalRecordProviderProps) {
  const [state, dispatch] =  useReducer(medicalRecordReducer, initialState);

  return (
    <MedicalRecordContext.Provider value={{ state, dispatch }}>
      {children}
    </MedicalRecordContext.Provider>
  );
}

export function useMedicalRecord() {
    const context = useContext(MedicalRecordContext);
    if (!context) {
      throw new Error("useMedicalRecord must be used within a MedicalRecordProvider");
    }
    return context;
  }