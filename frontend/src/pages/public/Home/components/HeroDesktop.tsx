import { DoctorsBadge, PatientsBadge } from '@/components/domain/StatsBadge'

const HeroDesktop = () => {
    return (
        <div className="lg:block hidden relative w-full h-[100vh] md:h-[80vh] bg-gradient-to-b from-[#51aff6ce] to-[#D9E9F6] after:w-[20vw] after:h-[50vh] after:bg-[rgba(167,216,253,0.21)] after:absolute after:-top-20 after:-left-40 after:rotate-45 before:w-[20rem] before:h-[38rem] before:rounded-full before:bg-[#cce2f43e] before:-bottom-28 before:right-0 before:absolute overflow-hidden">
            <div className="absolute bottom-0  h-[70%] w-full px-6 lg:px-28 flex flex-col md:flex-row">
                <div className="w-full md:h-full h-[50%] md:mt-16">
                    <p className="hero-text text-[#0c0b3eb5] text-5xl font-bold tracking-wider leading-tight ">Your Partner in <br /> Health and Wellness</p>
                    <p className="hero-sub-text text-[#0c0b3eb5] mt-4 text-xl ">We are committed to providing you the best medical and healthcare services to help you live healthier and happier</p>
                </div>
                <div className="w-full h-full flex items-end justify-center md:justify-end relative mt-8 md:mt-0">

                    <img className="doct-1 h-[100%] md:h-auto md:w-[80%] absolute bottom-0 left-0" src="https://res.cloudinary.com/dimcaj6yj/image/upload/v1748260036/homepage-male_hym2gf.png" alt="Male Doctor" />
                    <img className="doct-2 h-[100%] md:h-auto md:w-[80%] absolute bottom-0 right-0 md:left-0 md:ml-56 opacity-0 md:opacity-100" src="https://res.cloudinary.com/dimcaj6yj/image/upload/v1748259680/homepage-female_vkypie.png" alt="Female Doctor" />

                    <div className="top-badge hidden md:flex absolute md:bottom-16 left-0  w-[12rem] lg:w-[16rem] md:h-[4rem] lg:h-[5rem] bg-white/15 border-2 border-white/30 backdrop-blur-lg rounded-full items-center justify-center">
                        <PatientsBadge />
                    </div>

                </div>
            </div>
            <div className="top-badge flex md:hidden absolute top-24 border-l-0 w-[10rem] bg-white/15 border-2 border-white/30 backdrop-blur-lg rounded-r-full items-center justify-center">
                <PatientsBadge />
            </div>
            <div className="top-badge absolute hidden left-0 top-24 w-[16rem] h-[5rem] border-l-0 bg-white/15 border-2 border-white/30 backdrop-blur-lg rounded-r-full md:flex items-center justify-center">
                <DoctorsBadge />
            </div>
        </div>
    )
}

export default HeroDesktop