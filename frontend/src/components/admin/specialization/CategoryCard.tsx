import { useEffect, useState } from 'react';
import Img from '../../../assets/ology/heart-cardiology.png';
import { fetchAllSpecializationApi } from '../../../sevices/admin/specializationRepository';
import { ISpecialization } from '../../../types/specialization/specialization';
import { setError, setLoading } from '../../../store/slices/commonSlices/notificationSlice';
import { useDispatch } from 'react-redux';

interface CategoryCardProps {
  mount: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ mount }) => {
  const [specializations, setSpecializations] = useState<ISpecialization[]>([])
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchAllSpecialization = async () => {
      dispatch(setLoading(true))
      try {
        const { specializations } = await fetchAllSpecializationApi()
        console.log(specializations)
        setSpecializations(specializations)
      } catch (error: any) {
        dispatch(setError(error.message));
      } finally {
        dispatch(setLoading(false))
      }
    }
    fetchAllSpecialization()
  }, [fetchAllSpecializationApi, mount])
  return (
    <>
      {specializations.map((specialization, index) => (
        <div key={index} className="relative w-[300px] bg-[#fafafa] rounded-md p-6 flex flex-col items-center gap-4 shadow-md transition-transform duration-300 h-[300px]">
          <img src={specialization.image} alt="Cardiology" className="w-24 h-24 rounded-full object-cover border-4 border-[#6A9C89]" />
          <p className="text-md font-semibold text-[#6A9C89]">{specialization.name}</p>
          <p className="text-center text-gray-600 leading-relaxed overflow-auto">
            {specialization.description}
          </p>
        </div>
      ))}
    </>
  )
}

export default CategoryCard
