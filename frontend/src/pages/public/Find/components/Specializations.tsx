import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/slices/globalSlice';
import { specializationService } from '@/services/api/public';
import type { PublicSpecialization } from '@/types/specialization';


const Specializations: React.FC = () => {
      const [specializations, setSpecializations] = useState<PublicSpecialization[]>([])
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchAllSpecialization = async () => {
          dispatch(setLoading(true))
          try {
            const specializations  = await specializationService.getSpecialization()
            setSpecializations(specializations)
          } catch (err: unknown) {
            console.error("Error fetching specialization details:", err);
          } finally {
            dispatch(setLoading(false))
          }
        }
        fetchAllSpecialization()
      }, [  ])
    return (
        <div className='w-full text-[#0c0b3eb5] mt-10 '>
            <p className='text-xl text-secondary font-medium whitespace-nowrap'>Find Your Doctor</p>
            <div className='overflow-x-auto w-full p-8'>
                <div className='flex gap-8 md:gap-10 lg:gap-14 min-w-[600px]'>
                    {specializations.map((specialization, index) => (
                        <div
                            key={index}
                            onClick={() => navigate(`/find/${specialization?.name}`)}
                            className='cursor-pointer duration-300 w-[100px]  md:max-w-[120px] aspect-square rounded-full bg-[#51aff6ce] p-2 md:p-3 relative flex justify-center items-center'
                        >
                            <div className='absolute w-[40px] md:w-[90px] h-20 bg-[#c3d6e4] blur-lg rounded-full'></div>
                            <img
                                src={specialization?.imageUrl}
                                alt={specialization?.name}
                                className='z-10 rounded-full hover:scale-105 active:scale-95 duration-300'
                            />
                            <p className='absolute -bottom-8 text-sm md:text-lg font-medium'>{specialization?.name}</p>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Specializations;
