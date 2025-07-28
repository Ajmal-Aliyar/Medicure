import { DoctorsBadge, PatientsBadge } from '@/components/domain/StatsBadge'

const HeroMobile = () => {
    return (
        <div
            className="
        lg:hidden lg:w-[0px] lg:h-[0px] lg:opacity-0 lg:-z-50
        relative w-full h-screen max-h-[600px] overflow-hidden
        bg-gradient-to-b from-[#51aff6ce] to-[#D9E9F6]
        flex flex-col justify-between items-center px-2 md:px-4 pt-2
    
        before:content-[''] before:absolute before:w-[20rem] before:h-[70vh] before:rounded-full
        before:bg-[#cce2f43e] before:-bottom-28 before:right-0
    
        after:content-[''] after:absolute after:w-[20vw] after:h-[50vh] 
        after:bg-[rgba(167,216,253,0.21)] after:-top-20 after:-left-40 after:rotate-45
      "
        >

            <div className="w-full h-[50%] text-[#0c0b3eb5] mt-10 z-10 ">
                <p className="hero-text text-2xl md:text-5xl font-bold tracking-wider leading-tight ">Your Partner in <br /> Health and Wellness</p>
                <p className="hero-sub-text text-xs md:text-xl mt-4 ">We are committed to providing you the best medical and healthcare services to help you live healthier and happier</p>
            </div>

            <div className="flex h-fit  items-end w-[400px] sm:bg-yellow-50 bottom-0 right-0">
                <img
                    className="w-[300px] absolute left-[50%] -translate-x-20"
                    src="https://res.cloudinary.com/dimcaj6yj/image/upload/v1748260036/homepage-male_hym2gf.png" alt="Male Doctor" />
                <img
                    className="w-[300px] absolute right-[50%] translate-x-20 "
                    src="https://res.cloudinary.com/dimcaj6yj/image/upload/v1748259680/homepage-female_vkypie.png"
                    alt="Female Doctor" />
            </div>

            <div className="top-badge flex absolute items-center justify-center top-[45%] left-2  
                w-fit h-[2rem]  md:h-[4rem]
                bg-white/15 border-2 border-white/30 backdrop-blur-lg rounded-full p-2">
                <PatientsBadge />
            </div>

            <div className="top-badge flex absolute right-2 md:top-[54%] top-[34%] 
                w-fit h-[2rem]   md:h-[4rem] p-2
                bg-white/15 border-2 border-white/30 backdrop-blur-lg rounded-full md:flex items-center justify-center">
                <DoctorsBadge />
            </div>
        </div>


    )
}

export default HeroMobile