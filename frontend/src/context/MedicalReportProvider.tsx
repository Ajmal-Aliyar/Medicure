import { createContext, Dispatch, ReactNode, useContext, useReducer, useEffect } from "react";
import { IMedicalRecord } from "../types/record/record";
import { getMedicalRecordById } from "../sevices/medicalRecords/medicalRecord";


export const initialState: IMedicalRecord = {
  diagnosis: "",
  prescription: "",
  allergy: "",
  dateOfExamination: null,
  isCompleted: false
};

type MedicalRecordAction =
  | { type: "SET_FIELD"; field: keyof IMedicalRecord; value: string }
  | { type: "SET_DATE"; date: Date | null }
  | { type: "RESET" }
  | { type: "SET_RECORD"; record: IMedicalRecord }; 

const medicalRecordReducer = (state: IMedicalRecord, action: MedicalRecordAction): IMedicalRecord => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_DATE":
      return { ...state, dateOfExamination: action.date };
    case "SET_RECORD":
      return action.record; 
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

const MedicalRecordContext = createContext<MedicalRecordContextType | undefined>(undefined);

interface MedicalRecordContextType {
  state: IMedicalRecord;
  dispatch: Dispatch<MedicalRecordAction>;
}

interface MedicalRecordProviderProps {
  children: ReactNode;
  recordId: string;
}

export function MedicalRecordProvider({ children, recordId }: MedicalRecordProviderProps) {
  const [state, dispatch] = useReducer(medicalRecordReducer, initialState);
  
  useEffect(() => {
    async function fetchMedicalRecord() {
      try {
        const {record}= await getMedicalRecordById(recordId);
        dispatch({ type: "SET_RECORD", record });
      } catch (error) {
        console.error("Error fetching medical record:", error);
      }
    }

    if (recordId) {
      fetchMedicalRecord();
    }
  }, [recordId]);

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
