import { faUser, faUserAltSlash, faUserDoctor } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


function DoctorHeaderCard() {
    return (
        <div className=' bg-[#16423C] text-[#E9EFEC]  rounded-md'>
            <p className='font-semibold p-2 border-b-2 border-neutral-700'>Doctors Status</p>
            <div className='w-full grid grid-cols-3'>
                <div className="p-2 flex">
                    <div className="w-[50px] aspect-square rounded-md  bg-[#E9EFEC] flex items-center justify-center">
                        <FontAwesomeIcon icon={faUserDoctor} className={`text-[30px] duration-300 text-[#16423C]`} />
                    </div>
                    <div className="ml-2 flex justify-center flex-col">
                        <p className="text-xs">Total Doctors</p>
                        <p className="font-semibold">3500K</p>
                    </div>
                </div>

                <div className="p-2 flex">
                    <div className="w-[50px] aspect-square rounded-md  bg-[#E9EFEC] flex items-center justify-center">
                        <FontAwesomeIcon icon={faUser} className={`text-[30px] duration-300 text-[#16423C]`} />
                    </div>
                    <div className="ml-2 flex justify-center flex-col">
                        <p className="text-xs">Active Doctors</p>
                        <p className="font-semibold">3500K</p>
                    </div>
                </div>

                <div className="p-2 flex">
                    <div className="w-[50px] aspect-square rounded-md  bg-[#E9EFEC] flex items-center justify-center">
                        <FontAwesomeIcon icon={faUserAltSlash} className={`text-[30px] duration-300 text-[#16423C]`} />
                    </div>
                    <div className="ml-2 flex justify-center flex-col">
                        <p className="text-xs">Inactive Doctors</p>
                        <p className="font-semibold">3500K</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default DoctorHeaderCard
