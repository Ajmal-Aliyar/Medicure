import Loader from "@/components/ui/Loader";
import type { DoctorProfileForAdmin } from "@/types/doctor";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import DoctorProfile from "./DoctorProfile";
import DoctorProfessional from "./DoctorProfessionalDetails";
import DoctorDocuments from "./DoctorDocuments";
import DoctorStatus from "./DoctorStatus";
import Stepper from "@/components/ui/Stepper";
import { adminDoctorService } from "@/services/api/admin/doctor";

interface Props {
    doctorId: string | null;
    setDoctorId: (id: string | null) => void;
}
const slides = ["Profile", "Professional", "Documents", "Status"];

export const DoctorDetailsPannel = ({ doctorId, setDoctorId }: Props) => {
    const [doctor, setDoctor] = useState<DoctorProfileForAdmin | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (!doctorId) {
            setDoctor(null);
            return;
        }

        const fetchDoctorById = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await adminDoctorService.getDoctorProfile(doctorId);
                setDoctor(data);
            } catch (err) {
                console.error("Error fetching doctor profile:", err);
                setError("Failed to load doctor profile.");
                setDoctor(null);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctorById();
    }, [doctorId]);


    return (
        <div className={`${!doctorId ? "hidden " : "absolute"} lg:flex lg:relative z-10 w-full lg:w-[50%] bg-surface rounded-md shadow-md overflow-y-auto h-full max-h-[90vh]`}>
            {!doctorId && <div className="w-full h-full flex items-center justify-center">
                <p className="text-muted-dark">Select a doctor to view details</p>
            </div>}
            {loading && <div className="w-full h-full flex items-center justify-center"><Loader /></div>}

            {error && <p className="text-red-500">{error}</p>}

            {doctor && !loading && !error && (
                <div className="w-full  mx-auto p-4 bg-geen-300 relative">
                    <div className="flex justify-between sticky top-0 py-3 bg-surface shadow-[0_4px_6px_-4px_rgba(0,0,0,0.1)]">
                        <Stepper slides={slides} step={step} setStep={setStep} />
                        <X className="text-red-700/80 cursor-pointer" onClick={() => setDoctorId(null)} />
                    </div>

                    <div className=" rounded-xl p-6">
                        {step === 0 && <DoctorProfile data={doctor} />}
                        {step === 1 && <DoctorProfessional data={doctor} />}
                        {step === 2 && <DoctorDocuments data={doctor} />}
                        {step === 3 && <DoctorStatus data={doctor} />}
                    </div>
                </div>
            )}
        </div>
    );
};
