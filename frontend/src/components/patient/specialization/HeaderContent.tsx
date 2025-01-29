import React, { useEffect, useState } from 'react'
import img from '../../../assets//ology/neurolory.png'
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setError } from '../../../store/slices/commonSlices/notificationSlice';
import { fetchSpecializationApi } from '../../../sevices/admin/specializationRepository';
import { ISpecialization } from '../../../types/specialization/specialization';

const HeaderContent: React.FC = () => {
  const [data, setData] = useState<ISpecialization | null>(null)
  const { specialization } = useParams();
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchSpecialization = async () => {
      try {
        if (typeof specialization === "string" && specialization.trim() !== "") {
          const data = await fetchSpecializationApi(specialization);
          setData(data.specialization)
        }
      } catch (error: any) {
        dispatch(setError(error.message || "An error occurred while fetching specialization."));
      }
    };
  
    fetchSpecialization();
  }, [specialization, dispatch]);

  return (
    <div className='w-full flex justify-around mt-10 bg-gradient-to-r from-[#83c5f8ce] to-[#6fb8f4] h-[150px] rounded-2xl relative overflow-hidden'>
      <div className='w-[60%] h-[100%] bg-[#b8d7ef91] rounded-[50%] absolute -bottom-[70px] -right-[40px] -rotate-6 translateRight'></div>
      <div className='flex h-full flex-col justify-center gap-8 pl-3 z-10'>
        <p className='lg:text-lg md:text-md text-sm text-white max-w-[600px] translateLeft cursor-default '>{data?.description}</p>
      </div>
      <div className='items-end flex translate-y-16'>
        <img src={data?.image} alt="" className='max-w-[200px] z-10 translateUp ' />
      </div>
    </div>
  )
}

export default HeaderContent
