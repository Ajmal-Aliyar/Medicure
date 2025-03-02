import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setError } from '../../../store/slices/commonSlices/notificationSlice';
import { fetchTopDoctorsApi } from '../../../sevices/patient/findDoctors';
import { IFetchTopDoctors } from '../../../types/patient/findDoctors';
import { useParams } from 'react-router-dom';
import SelectedDoctor from './SelectedDoctor';
import { X } from 'lucide-react';


const TopSpecialists: React.FC = () => {
    const [doctors, setDoctors] = useState<IFetchTopDoctors[]>([]);
    const [showMore, setShowMore] = useState<boolean>(false)
    const [selectedDoctor, setSelectedDoctor] = useState<null | IFetchTopDoctors>(null)
    const { specialization } = useParams();
    const dispatch = useDispatch();
    const [skip, setSkip] = useState(0);
    const limit = 3;

    useEffect(() => {
        const getDoctors = async () => {
            try {
                let response: { data: IFetchTopDoctors[], hasMore: boolean };
                if (specialization) {
                    response = await fetchTopDoctorsApi(skip, limit, specialization);
                } else {
                    response = await fetchTopDoctorsApi(skip, limit);
                }
                setShowMore(response.hasMore)
                setDoctors((prevDoctors) => [...prevDoctors, ...response.data]);
            } catch (error: any) {
                dispatch(setError(error.message));
            }
        };
        getDoctors();

    }, [skip, limit, dispatch, specialization]);

    const handleSetDoctor = (doctor: IFetchTopDoctors) => {
        setSelectedDoctor(doctor)
        setTimeout(() => {
            const selectedCard = document.getElementById(`doctor-${doctor._id}aw23`);
            if (selectedCard) {
                selectedCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 100);
    };

    const loadMore = () => {
        setSkip(prevSkip => prevSkip + limit);
    };
    return (
        <div className='w-full my-10 pb-48 '>
            <div className='flex justify-between'>
                <p className='text-xl font-bold text-[#0c0b3eb5]'>Top Specialists</p>
                <input type="text" className='py-1 px-4 border-2 border-blue-400 rounded-full' placeholder='Search for doctors.. ' />
            </div>
            <div className='flex flex-col md:flex-row w-full mt-10'>
                <div
                    className={`flex justify-around py-5 gap-5 ${selectedDoctor
                        ? 'w-full md:w-[400px] lg:w-[400px] md:flex-col md:h-[640px] overflow-x-auto md:overflow-y-auto flex-none'
                        : 'w-full flex-wrap h-auto flex-grow '
                        }`}
                >
                    {doctors.length <= 0 && <p className='text-gray-500'>No slots are available for this specialization at the moment.</p>}
                    {doctors.map((doctor) => (
                        <div
                            id={`doctor-${doctor._id}aw23`}
                            key={doctor._id}
                            className={`${selectedDoctor && selectedDoctor._id !== doctor._id ? 'bg-opacity-5 bg-black opacity-35' : ''} 
                        duration-300 flex p-2 rounded-md items-center relative mb-2 shadow-md w-full min-w-[380px] md:min-w-[380px] md:w-[380px] bg-white`}
                        >

                            <div className='flex gap-2 flex-wrap z-10'>
                                <div className='max-w-[130px] '>
                                    <img src={doctor.profileImage} className='rounded-md' alt="" />
                                </div>
                                <div className='grid grid-cols-3 gap-x-1 text-sm max-w-[210px]'>
                                    <p className='col-span-3 font-semibold text-[#0c0b3eb5] text-lg'>{doctor.fullName}</p>
                                    <p className='col-span-3 text-md font-medium text-blue-400'>{doctor.specialization}</p>
                                    <p>Language</p>
                                    <p className='col-span-2 flex'>{`: ${doctor.languageSpoken}`}</p>
                                    <p>Experience</p>
                                    <p className='col-span-2'>{`: ${doctor.yearsOfExperience} year`}</p>
                                    <p>Rating</p>
                                    <p className='col-span-2'>{`: ${doctor.rating}% (${doctor.reviewCount} reviews)`}</p>
                                </div>
                                <div className='flex justify-between w-full '>
                                    <p className='font-semibold text-md text-[#0c0b3eb5]'>Fees : {doctor.fees}</p>
                                    <button className='px-2 bg-[#51aff6ce] text-white text-sm font-medium rounded-md shadow-md active:scale-95 duration-300' onClick={() => handleSetDoctor(doctor)}>Book now</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={`${selectedDoctor ? '' : 'hidden'} w-full relative`}>
                    {selectedDoctor && <SelectedDoctor doctor={selectedDoctor} />}
                    <div className='absolute top-2 right-3' onClick={() => setSelectedDoctor(null)}><X size={28} color="#51aff6ce" strokeWidth={3} /></div>
                </div>
            </div>

            {showMore && <button onClick={loadMore} className="p-1 flex justify-end w-full font-semibold px-3 text-neutral-400">Show More</button>}
        </div>
    )
}

export default TopSpecialists
