import ListedSlots from '../../components/doctor/appointments/ListedSlots'
import BookedAppointments from '../../components/doctor/appointments/BookedAppointments'
import { useState } from 'react'

const Appointments = () => {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  return (
    <div className='h-screen w-full p-4 flex justify-center overflow-y-auto rounded-md pt-20  content '>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-5xl relative">
        <ListedSlots selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} />
        <div className={`w-full pb-6 rounded-md bg-white shadow-md absolute md:relative ${selectedSlot ? '' : 'hidden md:block'}`}>
        <BookedAppointments  selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot}/>
        </div>
      </div>
    </div>
  )
}

export default Appointments
