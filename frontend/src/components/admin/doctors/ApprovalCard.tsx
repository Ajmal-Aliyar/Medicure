import { faArrowRight, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dispatch, SetStateAction } from 'react';

interface ApprovalCardProps {
    setOpenPage: Dispatch<SetStateAction<string>>;
}

const ApprovalCard:React.FC<ApprovalCardProps> = ({setOpenPage}) => {
    return (
        <div className='w-full h-[700px] bg-white shadow-md rounded-md'>
            <div className=" border-b-2 border-neutral-100 flex justify-between p-2 relative">
                <p className='font-semibold p-2'>Doctor Approval Request</p>
                <input className="px-4 max-w-[300px] border-2 w-full rounded-full outline-none pr-12 peer"
                    placeholder="Search here" />
                <FontAwesomeIcon icon={faSearch} className={`text-[25px]  text-neutral-400 absolute right-6 top-1/2 -translate-y-1/2 `} />
            </div>
            <div className="max-h-[20rem] h-full p-2">
                <div className="border flex p-2 rounded-md items-center relative mb-2">
                    <div className="w-14 h-14 bg-blue-200 rounded-full"></div>
                    <div className="ml-2">
                        <p className="font-semibold text-lg">Shruti Kumar</p>
                        <p className="font-semibold text-sm text-neutral-500">Dentist</p>
                    </div>
                    <div className="w-14 h-10 bg-neutral-300 rounded-md absolute right-0 mr-2"></div>
                </div>

                <div className="border flex p-2 rounded-md items-center relative">
                    <div className="w-14 h-14 bg-blue-200 rounded-full"></div>
                    <div className="ml-2">
                        <p className="font-semibold text-lg">Shruti Kumar</p>
                        <p className="font-semibold text-sm text-neutral-500">Dentist</p>
                    </div>
                    <div className="w-14 h-10 bg-neutral-300 rounded-md absolute right-0 mr-2 flex justify-center items-center group active:scale-95 " onClick={() => setOpenPage('ApprovalPage')}>
                        <FontAwesomeIcon icon={faArrowRight} className={`text-[25px] duration-200 text-neutral-500 group-hover:translate-x-2 group-hover:scale-110  `} />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ApprovalCard
