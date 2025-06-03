import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { IFetchAllApprovedDoctors } from '../../../types/doctor/verifyDetailsType';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllDoctorsSummaryWithStatusApi } from '../../../sevices/admin/doctorRepository';
import { setError } from '../../../store/slices/commonSlices/notificationSlice';
import { setSelectedId } from '../../../store/slices/adminSlices/manageDoctorSlice';
import { RootState } from '../../../store/store';

interface ApprovalCardProps {
    setOpenPage: Dispatch<SetStateAction<string>>;
}

const ApprovalCard: React.FC<ApprovalCardProps> = ({ setOpenPage }) => {
    const doctorId = useSelector((state: RootState) => state.manageDoctor.selectId)
    const [doctors, setDoctors] = useState<IFetchAllApprovedDoctors[]>([]);
    const [showMore, setShowMore] = useState<boolean>(false)
    const dispatch = useDispatch();
    const [skip, setSkip] = useState(0);
    const limit = 5;

    useEffect(() => {
        const getDoctors = async () => {
            try {
                const response = await fetchAllDoctorsSummaryWithStatusApi("applied",skip, limit);
                setShowMore(false)
                setDoctors((prevDoctors) => [...prevDoctors, ...response.data]);
            } catch (error: unknown) {
                dispatch(setError('Error occured while fetching doctors'));
            }
        };

        getDoctors();

    }, [skip, limit, dispatch]);

    const handleDoctorSelect = (_id: string) => {
        console.log(_id)
        dispatch(setSelectedId({ _id }))
        setOpenPage('ApprovalPage')
    }

    const handleBack = () => {
        dispatch(setSelectedId({ _id: '' }))
        setOpenPage('AllDoctors')
    }

    const loadMore = () => {
        setSkip(prevSkip => prevSkip + limit);
    };
    return (
        <div className='w-full h-[700px] bg-[#fafafa] shadow-md rounded-md text-[#16423cc1]'>
            <div className=" border-b-2 border-[#C4DAD2] flex justify-between p-2 relative">
                <p className='font-semibold p-2 flex cursor-pointer' onClick={handleBack}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                    </svg> Applicant Requests</p>
                </div>
            <div className="h-[616px] p-2 overflow-y-auto">
                {doctors.map((doctor) => (
                    <div key={doctor.id} className={`border flex p-2 rounded-md items-center relative mb-2  duration-300 `} >
                        <div className="w-14 h-14 bg-blue-200 rounded-full">
                            <img src={doctor.profileImage || ''} alt={doctor.fullName} className="w-full h-full object-cover rounded-full" />
                        </div>
                        <div className="ml-2">
                            <p className="font-semibold text-lg">{doctor.fullName}</p>
                            <p className="font-semibold text-sm text-[#6A9C89]  ">{doctor.specialization}</p>
                        </div>
                        <div className={`${doctorId === doctor.id ? 'bg-[#6A9C89]' : 'bg-[#C4DAD2]'} cursor-pointer w-14 h-10  rounded-md absolute right-0 mr-2 flex justify-center items-center group active:scale-90 duration-300`} onClick={() => handleDoctorSelect(doctor.id)}>
                            <FontAwesomeIcon icon={faArrowRight} className={`text-[25px] duration-300 text-[#E9EFEC] group-hover:text-[#16423C] group-hover:scale-110 ${doctorId === doctor.id ? 'translate-x-2 scale-110' : ''}`} />
                        </div>
                    </div>
                ))}
            </div>
            {showMore && <button onClick={loadMore} className="p-1 flex justify-end w-full font-semibold px-3">Show More</button>}
        </div>
    )
}

export default ApprovalCard
