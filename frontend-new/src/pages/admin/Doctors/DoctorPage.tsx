import { useState } from "react";
import { DoctorDetailsPannel, DoctorListPannel } from "./components";



const DoctorPage = () => {
    const [ selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null)


    return (
        <div className="w-full bg-surfce rounded-md flex flex-col md:flex-row gap-4 relative">
            <DoctorListPannel doctorId={selectedDoctorId} setDoctorId={setSelectedDoctorId} />
            <DoctorDetailsPannel doctorId={selectedDoctorId} setDoctorId={setSelectedDoctorId} />
        </div>
    )
}

export default DoctorPage;
