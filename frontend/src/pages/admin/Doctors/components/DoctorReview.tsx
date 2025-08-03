import { useState } from "react";
import type { DoctorProfileForAdmin } from "@/types/doctor";


import DoctorProfile from "./DoctorProfile";
import DoctorProfessional from "./DoctorProfessionalDetails";
import DoctorDocuments from "./DoctorDocuments";
import DoctorStatus from "./DoctorStatus";

interface Props {
  doctor: DoctorProfileForAdmin;
}

const slides = ["Profile", "Professional", "Documents", "Status"];

const DoctorReview = ({ doctor }: Props) => {
  const [step, setStep] = useState(0);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="flex justify-center mb-4 gap-2">
        {slides.map((label, index) => (
          <button
            key={index}
            onClick={() => setStep(index)}
            className={`px-4 py-2 rounded-full text-sm font-medium shadow ${
              step === index ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        {step === 0 && <DoctorProfile data={doctor} />}
        {step === 1 && <DoctorProfessional data={doctor} />}
        {step === 2 && <DoctorDocuments data={doctor} />}
        {step === 3 && <DoctorStatus data={doctor} />}
      </div>
    </div>
  );
};

export default DoctorReview;