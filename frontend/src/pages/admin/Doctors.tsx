import { useState } from "react"
import AllDoctorsCard from "../../components/admin/doctors/AllDoctorsCard"
import ApprovalCard from "../../components/admin/doctors/ApprovalCard"
import DoctorHeaderCard from "../../components/admin/doctors/DoctorHeaderCard"
import ApproveDoctorDetails from "../../components/admin/doctors/ApproveDoctorDetails"
import SelectedDoctorDetails from "../../components/admin/doctors/SelectedDoctorDetails"
import { faUpRightAndDownLeftFromCenter } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function Doctors() {
    const [openPage, setOpenPage] = useState('AllDoctors')
    const [zoom, setZoom] = useState(true)
    return (

        <div className={`w-full h-full flex flex-col lg:flex-row flex-1 py-6 px-3 gap-5 lg:justify-center lg:items-center duration-700 ${openPage === 'ApprovalPage' ? '-translate-x-1/2' : '-translate-x-0'}`}>
            <div className={`w-full lg:w-[48%] h-[700px] flex flex-col gap-4 duration-700 ${openPage === 'ApprovalPage' ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}>
                <DoctorHeaderCard />
                <AllDoctorsCard setOpenPage={setOpenPage} />
            </div>
            <div className={`flex w-full lg:w-[48%] duration-500 ${zoom && openPage === 'selectedDoctor' ? 'scale-110 -translate-x-1/2' : 'scale-100 -translate-x-0'}`}>
                {openPage !== 'selectedDoctor' && <ApprovalCard setOpenPage={setOpenPage} />}
                {openPage === 'selectedDoctor' && (
                    <div className='w-full h-[700px] bg-white shadow-md rounded-md'>
                        <div className=" border-b-2 border-neutral-100 flex justify-between items-center p-2 relative">
                            <p className='font-semibold p-2 flex' onClick={() => setOpenPage('AllDoctors')}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="15 18 9 12 15 6" />
                                </svg>Details</p>
                            <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} className={`text-[25px]  text-neutral-800`} onClick={() => setZoom(p => !p)} />
                        </div>
                        <div className=" h-[640px] p-2 overflow-y-auto">
                            <SelectedDoctorDetails />
                        </div>
                    </div>
                )}
            </div>
            {
                openPage === 'ApprovalPage' && <ApproveDoctorDetails setOpenPage={setOpenPage}/>
            }
        </div>

    )
}

export default Doctors
