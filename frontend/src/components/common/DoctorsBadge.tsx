import dummyDoctor1 from "../../assets/doctors/doctordp1.jpg"
import dummyDoctor2 from "../../assets/doctors/doctordp2.jpg"
import dummyDoctor3 from "../../assets/doctors/doctordp3.jpg"

function DoctorsBadge() {
    return (
        <>
        
            <div className="relative w-[50%] h-full flex justify-center items-center">
                <img className="rounded-full w-[40px] absolute left-0" src={dummyDoctor1} alt="" />
                <img className="rounded-full w-[40px] absolute left-[80px]" src={dummyDoctor3} alt="" />
                <img className="rounded-full w-[40px] scale-125 absolute left-[40px]" src={dummyDoctor2} alt="" />
            </div>
            <p className="text-center p-2 text-[#0c0b3eb5] mr-4" style={{ lineHeight: '1' }}>
                <span className="font-semibold">870+</span> <br />
                <span className="text-xs">DOCTORS</span>
            </p>
        </>
    )
}

export default DoctorsBadge
