import { useNavigate, useParams } from 'react-router-dom'
import HeroHeader from '../components/HeroHeader'
import FilterDoctor from './components/FilterDoctor'
import { useEffect, useState } from 'react'
import { specializationService } from '@/services/api/public'
import type { ISpecialization } from '@/types/specialization'
import { Button } from '@/components/ui/Button'

const FindWithSpecializationPage = () => {
    const [details, setDetails] = useState<ISpecialization | null>(null)
    const {specialization} = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        fetchSpecializationDetails()
    }, [])
    const fetchSpecializationDetails = async () => {
        const details = await specializationService.getSpecializationDetails(specialization as string)
        setDetails(details) 
    }
  return (
    <div className="max-w-[1300px] w-screen">
        <Button variant='white' children='Back' className='px-3 mt-3' onClick={() => navigate(-1) }/>
      <HeroHeader
        title={details?.description}
        buttonText="Search For"
        imageUrl={details?.imageUrl}
        hasButton
        variant="mini"
      />
      <FilterDoctor specialization={specialization}/>

      
    </div>
  )
}

export default FindWithSpecializationPage