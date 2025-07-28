import { useEffect, useState } from "react"
import { api } from "../../utils/axiosInstance"


const SlotTrial = () => {
  const [morningSlots, setMorningSlots] = useState([])
  const [afterNoonSlots, setAfterNoonSlots] = useState([])
  const [eveningSlots, setEveningSlots] = useState([])
  const [nightSlots, setNightSlots] = useState([])
  const [lateNightSlots, setLateNightSlots] = useState([])


  useEffect(() => {
    const getResponse = async () => {
      const result: any = await fetchAllDoctorSlots()
      setMorningSlots(result.data.data?.morning)
      setAfterNoonSlots(result.data.data?.afternoon)
      setEveningSlots(result.data.data?.evening)
      setNightSlots(result.data.data?.night)
      setLateNightSlots(result.data.data?.lateNight)
      console.log(result, 'response')
    }
    getResponse()
  }, [])

  return (
    <div className='w-full h-full bg-gray-200 rounded-md p-2 flex gap-2'>
      <div className="w-[40rem] h-[30rem] bg-amber-200">
        <p>08-06-25</p>
        <p>09-06-25</p>
        <p>10-06-25</p>
        <p>11-06-25</p>
        <p>12-06-25</p>
      </div>
      <div className="w-full h-[30rem] bg-amber-100 p-2">
        <div className="w-full bg-amber-500 text-white flex gap-2 px-4">
          <p>All &gt;</p>
          <p>All &gt;</p>
          <p>All &gt;</p>
        </div>
        <div>
          <p>Morning 6 AM – 12 PM</p>
          <div className="w-full h-[10rem] flex flex-wrap gap-2 p-2">
            {morningSlots.map((slot: any) => (
              <div className="rounded-md outline py-3 px-5 h-fit w-fit cursor-pointer">
               o  {slot.startTime}
              </div>
            ))}
          </div>
          <p>Afternoon 12 PM – 4 PM</p>
          <div className="w-full h-[10rem] flex flex-wrap gap-2 p-2">
            {afterNoonSlots.map((slot: any) => (
              <div className="rounded-md outline py-3 px-5 h-fit w-fit cursor-pointer">
               o  {slot.startTime}
              </div>
            ))}
          </div>
          <p>Evening 4 PM – 8 PM</p>
          <div className="w-full h-[10rem] flex flex-wrap gap-2 p-2">
            {eveningSlots.map((slot: any) => (
              <div className="rounded-md outline py-3 px-5 h-fit w-fit cursor-pointer">
               o  {slot.startTime}
              </div>
            ))}
          </div>
          <p>Night 8 PM – 12 AM</p>
          <div className="w-full h-[10rem] flex flex-wrap gap-2 p-2">
            {nightSlots.map((slot: any) => (
              <div className="rounded-md outline py-3 px-5 h-fit w-fit cursor-pointer">
               o  {slot.startTime}
              </div>
            ))}
          </div>
          <p>Late Night 12 AM – 6 AM</p>
          <div className="w-full h-[10rem] flex flex-wrap gap-2 p-2">
            {lateNightSlots.map((slot: any) => (
              <div className="rounded-md outline py-3 px-5 h-fit w-fit cursor-pointer">
               o  {slot.startTime}
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  )
}

export default SlotTrial



const fetchAllDoctorSlots = async () => {
  return await api.get('/api/doctor/slot', { params: { date: '2025-06-09', status: 'available', isActive: false } })
}
