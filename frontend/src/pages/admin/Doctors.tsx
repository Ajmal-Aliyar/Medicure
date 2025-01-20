import { useState } from "react"
import AllDoctorsCard from "../../components/admin/doctors/AllDoctorsCard"
import ApprovalCard from "../../components/admin/doctors/ApprovalCard"
import DoctorHeaderCard from "../../components/admin/doctors/DoctorHeaderCard"
import ApproveDoctorDetails from "../../components/admin/doctors/ApproveDoctorDetails"

function Doctors() {
    const [openPage, setOpenPage] = useState('AllDoctors')
    return (

        <div className={`w-full h-full flex flex-col lg:flex-row flex-1 py-6 px-3 gap-5 lg:justify-center lg:items-center duration-700 ${openPage === 'ApprovalPage' ? '-translate-x-1/2' : '-translate-x-0'}`}>
            <div className={`w-full lg:w-[48%] h-[700px] flex flex-col gap-4 duration-700 ${openPage === 'ApprovalPage' ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}>
                <DoctorHeaderCard />
                <AllDoctorsCard />
            </div>
            <div className="flex w-full lg:w-[48%]">
            <ApprovalCard setOpenPage={setOpenPage}/>
            </div>
            {
                openPage === 'ApprovalPage' && <ApproveDoctorDetails />
            }
        </div>
            
    )
}

export default Doctors
