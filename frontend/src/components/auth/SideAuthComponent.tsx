import DoctorsBadge from './DoctorsBadge'
import PatientsBadge from './PatientsBadge'
import doctor from '../../assets/doctors/homepage-female.png'


function SideAuthComponent() {
  return (
    <div
          className="auth w-[19rem] h-[19rem]  bg-gradient-to-tl from-[#30628b] via-[#5daeeb] to-[#73b9ef] rounded-[15%] rotate-45 relative"
          style={{
            boxShadow: "inset 0 4px 6px rgba(0, 0, 0, 0.1), inset 0 -4px 6px rgba(0, 0, 0, 0.5), 0 4px 6px rgba(0, 0, 0, 0.1)"
          }}
        >
           <div className='right-badge scale-75 w-[16rem] h-[5rem] absolute -rotate-45 z-10 -right-16 -top-16 bg-white/15 border-2 border-white/30 backdrop-blur-lg rounded-full md:flex items-center justify-center'>
                <DoctorsBadge />
           </div>
           <div className='left-badge scale-75 w-[16rem] h-[5rem] absolute -rotate-45 z-10 -left-10 -bottom-8 bg-white/15 border-2 border-white/30 backdrop-blur-lg rounded-full md:flex items-center justify-center'>
                <PatientsBadge />
           </div>
          <div className='absolute -bottom-[1px] -right-[1px]  w-[90%] h-[90%] z-10 bg-gradient-to-tl from-[#1c1c1cd8] via-transparent rounded-[15%]'></div>
          <img
            className="-rotate-45 scale-[1.63]  -translate-x-8 -translate-y-6 w-full h-full object-cover object-top"
            src={doctor}
            alt="Doctor"
            style={{
              clipPath: "polygon(0px 0px, 100% 0px, 97% 56%, 56% 97%, 54% 97%, 50% 98%, 47% 97%, 3% 54%)"
            }}
          />
        </div>
  )
}

export default SideAuthComponent
