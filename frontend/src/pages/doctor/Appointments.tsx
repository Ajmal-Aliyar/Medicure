import ListedSlots from '../../components/doctor/appointments/ListedSlots'
import BookedAppointments from '../../components/doctor/appointments/BookedAppointments'
import { useState } from 'react'
import { ChevronLeft } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Appointments = () => {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)


  useGSAP(() => {
    const tl = gsap.timeline();
  
    tl.from(".box", {
        opacity:0,
        y:50,
        stagger:0.1,
        delay: '0.7'
    }, '-=0.8');
  });
  return (
    <div className='w-full p-4 flex justify-center rounded-md content '>
      <div className="flex box gap-3 w-full  relative">
        <div className={`  ${selectedSlot ? "lg:w-[52%]" : "lg:w-[150%]"}  duration-500 transition-all overflow-y-auto bg-white rounded-md shadow-md  relative `}>
          <p className='p-3 border-b border-gray-300 text-[#343462] font-medium '>Available Slots</p>
          <ListedSlots selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} />
        </div>
        <div className={`box w-full rounded-md bg-white h-full shadow-md absolute md:relative ${selectedSlot ? '' : 'hidden md:block'}`}>
          <div className='h-full rounded-md'>
            <p className='p-3 flex items-center border-b border-gray-300 text-[#343462] font-medium cursor-pointer' onClick={() => setSelectedSlot(null)}><ChevronLeft size={16} />Patients</p>

            <BookedAppointments selectedSlot={selectedSlot} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Appointments
