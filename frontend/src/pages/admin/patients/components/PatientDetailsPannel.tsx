import Loader from "@/components/ui/Loader";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import Stepper from "@/components/ui/Stepper";
import { adminPatientService } from "@/services/api/admin/patient";
import type { IPatient } from "@/types/patient";
import PatientProfile from "./PatientProfile";
import PatientStatus from "./PatientStatus";

interface Props {
    patientID: string | null;
    setPatientID: (id: string | null) => void;
}
const slides = ["Profile", "Status"];

export const PatientDetailsPannel = ({ patientID, setPatientID }: Props) => {
    const [Patient, setPatient] = useState<IPatient | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (!patientID) {
            setPatient(null);
            return;
        }

        const fetchPatientById = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await adminPatientService.getPatientProfile(patientID);
                setPatient(data);
            } catch (err) {
                console.error("Error fetching Patient profile:", err);
                setError("Failed to load Patient profile.");
                setPatient(null);
            } finally {
                setLoading(false);
            }
        };

        fetchPatientById();
    }, [patientID]);


    return (
        <div className={`${!patientID ? "hidden " : "absolute"} lg:flex lg:relative z-10 w-full lg:w-[50%] bg-surface rounded-md shadow-md overflow-y-auto h-full max-h-[90vh]`}>
            {!patientID && <div className="w-full h-full flex items-center justify-center">
                <p className="text-muted-dark">Select a Patient to view details</p>
            </div>}
            {loading && <div className="w-full h-full flex items-center justify-center"><Loader /></div>}

            {error && <p className="text-red-500">{error}</p>}

            {Patient && !loading && !error && (
                <div className="w-full  mx-auto p-4 bg-geen-300 relative">
                    <div className="flex justify-between sticky top-0 py-3 bg-surface shadow-[0_4px_6px_-4px_rgba(0,0,0,0.1)]">
                        <Stepper slides={slides} step={step} setStep={setStep} />
                        <X className="text-red-700/80 cursor-pointer" onClick={() => setPatientID(null)} />
                    </div>

                    <div className=" rounded-xl p-6">
                        {step === 0 && <PatientProfile data={Patient} />}
                        {step === 1 && <PatientStatus data={Patient} setPatient={setPatient} />}
                    </div>
                </div>
            )}
        </div>
    );
};
