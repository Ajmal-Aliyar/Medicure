import dummyDoctor1 from "../../assets/patients/patient1.jpg"
import dummyDoctor2 from "../../assets/patients/patient2.jpg"
import dummyDoctor3 from "../../assets/patients/patient1.jpg"

function PatientsBadge() {
    return (
        <>
            <div className="relative w-[50%] h-full flex justify-center items-center">
                <img className="rounded-full lg:w-[40px] md:w-[30px] w-[25px] absolute left-0" src={dummyDoctor1} alt="" />
                <img className="rounded-full lg:w-[40px] md:w-[30px] w-[25px] absolute left-[40px] lg:left-[80px]" src={dummyDoctor3} alt="" />
                <img className="mid-img rounded-full lg:w-[40px] md:w-[30px] w-[25px] absolute left-[20px] lg:left-[40px]" src={dummyDoctor2} alt="" />
            </div>
            <p className="text-center p-2 text-[#0c0b3eb5]  mr-2" style={{ lineHeight: '1' }}>
                <span className="font-semibold">340K+</span> <br />
                <span className="text-xs ">Patients</span>
            </p>
        </>
    )
}

export default PatientsBadge
