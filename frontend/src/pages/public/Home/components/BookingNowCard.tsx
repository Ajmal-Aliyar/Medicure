import { Calendar, LogIn, Stethoscope, User2 } from "lucide-react"
import { useNavigate } from "react-router-dom"


function BooknowCard() {
    const navigate = useNavigate()
    return (
        <div className="flex justify-center items-center w-full">
        <div className="book-bar w-full md:w-[80vw] h-full bg-gray-50 md:rounded-lg shadow-md md:shadow-xl flex justify-center items-center md:px-10 py-3">
            <div className=" w-full flex justify-around">
                <div className=" flex flex-col md:flex-row items-center gap-2 py-2">
                    <div className="flex justify-center items-center bg-gradient-to-b to-[#97cdf6] from-[#51aff6] w-10 h-10 md:w-16 md:h-16 rounded-full">
                        <Calendar className="text-white"/>
                    </div>
                    <p className="md:p-2 hidden md:block  text-[#0c0b3eb5] text-center" style={{ lineHeight: '1' }}>
                        <span className="md:font-semibold text-sm ">Date</span> <br />
                        <span className="md:text-sm text-xs">30-07</span>
                    </p>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-2 py-2">
                    <div className="flex justify-center items-center bg-gradient-to-b to-[#97cdf6] from-[#51aff6] w-10 h-10 md:w-16 md:h-16 rounded-full">
                        <User2 className="text-white"/>
                    </div>
                    <p className="md:p-2 hidden md:block  text-[#0c0b3eb5] text-center " style={{ lineHeight: '1' }}>
                        <span className="md:font-semibold text-sm">Slots</span> <br />
                        <span className="md:text-sm text-xs">30K</span>
                    </p>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-2 py-2">
                    <div className="flex justify-center items-center bg-gradient-to-b to-[#97cdf6] from-[#51aff6] w-10 h-10 md:w-16 md:h-16 rounded-full">
                        <Stethoscope className="text-white"/>
                    </div>
                    <p className="md:p-2 hidden md:block  text-[#0c0b3eb5] text-center" style={{ lineHeight: '1' }}>
                        <span className="md:font-semibold text-sm">Doctors</span> <br />
                        <span className="md:text-sm text-xs">950 </span>
                    </p>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-2 py-2 justify-center">
                    <div className="bg-gradient-to-b to-[#97cdf6] from-[#51aff6] md:w-[15rem] md:h-[3rem] p-2 rounded-full flex items-center justify-center text-sm md:font-bold"
                    onClick={() => navigate('/find-doctors')}>
                        <LogIn className="text-white md:hidden"/>
                        <p className="text-white hidden md:block">Book Now</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default BooknowCard
