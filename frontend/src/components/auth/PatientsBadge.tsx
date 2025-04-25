import dummyDoctor1 from "../../assets/patients/patient1.jpg"
import dummyDoctor2 from "../../assets/patients/patient2.jpg"
import dummyDoctor3 from "../../assets/patients/patient1.jpg"

function PatientsBadge() {
    return (
        <>
            <div className="relative h-full flex justify-center items-center">
                <img className="rounded-full w-[15px] md:w-[20px] lg:w-[35px]" src={dummyDoctor1} alt="" />
                <img className="mid-img rounded-full w-[15px] md:w-[20px] lg:w-[35px]" src={dummyDoctor2} alt="" />
                <img className="rounded-full w-[15px] md:w-[20px] lg:w-[35px]" src={dummyDoctor3} alt="" />
            </div>
            
            <p className="flex justify-center items-center gap-1 p-2 text-[#0c0b3eb5]" style={{ lineHeight: '1' }}>
                <span className="font-semibold text-sm lg:text-xl">340K+</span> <br />
                <span className="text-xs font-medium">Patients</span>
            </p>
        </>
    )
}

export default PatientsBadge
