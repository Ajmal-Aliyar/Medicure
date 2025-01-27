import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setError } from '../../../store/slices/commonSlices/notificationSlice';
import { fetchTopDoctorsApi } from '../../../sevices/patient/findDoctors';
import { IFetchTopDoctors } from '../../../types/patient/findDoctors';

const TopSpecialists: React.FC = () => {
    const [doctors, setDoctors] = useState<IFetchTopDoctors[]>([]);
    const [showMore, setShowMore] = useState<boolean>(false)
    const dispatch = useDispatch();
    const [skip, setSkip] = useState(0);
    const limit = 5;

    useEffect(() => {
        const getDoctors = async () => {
            try {
                const response = await fetchTopDoctorsApi(skip, limit);
                console.log(response)
                setShowMore(response.hasMore)
                setDoctors((prevDoctors) => [...prevDoctors, ...response.data]);
            } catch (error: any) {
                dispatch(setError(error.message));
            }
        };

        getDoctors();

    }, [skip, limit, dispatch]);

    const loadMore = () => {
        setSkip(prevSkip => prevSkip + limit);
    };
    return (
        <div className='w-full mt-10'>
            <div className='flex justify-between'>
                <p className='text-xl font-bold text-[#0c0b3eb5]'>Top Specialists</p>
                <input type="text" className='py-1 px-4 border-2 border-blue-400 rounded-full' placeholder='Search for doctors.. ' />
            </div>
            <div className='flex flex-wrap justify-around py-5 gap-5'>
                {doctors.map((doctor) => (
                    <div key={doctor._id} className="flex p-2 rounded-md items-center relative mb-2 bg-white hover:border-[#3ab8a7a8] hover:border-2 border-[#C4DAD2] active:scale-95 duration-300" >
                        <div className=" bg-blue-200 rounded-full">
                            <img src={doctor.profileImage} alt={doctor.fullName} className="w-full h-full object-cover rounded-full" />
                        </div>
                        <div className="ml-2">
                            <p className="font-semibold text-lg">{doctor.fullName}</p>
                            <p className="font-semibold text-sm text-[#6A9C89] ">{doctor.specialization}</p>
                            <p className="text-xs text-neutral-500 ">{doctor.rating} (170+ Reviews)</p>
                        </div>
                    </div>
                ))}
            </div>
            {showMore && <button onClick={loadMore} className="p-1 flex justify-end w-full font-semibold px-3 text-neutral-400">Show More</button>}
        </div>
    )
}

export default TopSpecialists
