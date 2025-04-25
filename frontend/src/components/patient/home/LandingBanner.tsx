import maleDoctor from "../../../assets/doctors/homepage-male.png"
import femaleDoctor from "../../../assets/doctors/homepage-female.png"
import DoctorsBadge from "../../auth/DoctorsBadge"
import PatientBadge from "../../auth/PatientsBadge"
function LandingBanner() {

    return (
        <>
            <div className="lg:block hidden relative w-full h-[100vh] md:h-[80vh] bg-gradient-to-b from-[#51aff6ce] to-[#D9E9F6] after:w-[20vw] after:h-[50vh] after:bg-[rgba(167,216,253,0.21)] after:absolute after:-top-20 after:-left-40 after:rotate-45 before:w-[20rem] before:h-[38rem] before:rounded-full before:bg-[#cce2f43e] before:-bottom-28 before:right-0 before:absolute overflow-hidden">
                <div className="absolute bottom-0  h-[70%] w-full px-6 lg:px-28 flex flex-col md:flex-row">
                    <div className="w-full md:h-full h-[50%] md:mt-16">
                        <p className="hero-text text-[#0c0b3eb5] text-5xl font-bold tracking-wider leading-tight ">Your Partner in <br /> Health and Wellness</p>
                        <p className="hero-sub-text text-[#0c0b3eb5] mt-4 text-xl ">We are committed to providing you the best medical and healthcare services to help you live healthier and happier</p>
                    </div>
                    <div className="w-full h-full flex items-end justify-center md:justify-end relative mt-8 md:mt-0">

                        <img className="doct-1 h-[100%] md:h-auto md:w-[80%] absolute bottom-0 left-0" src={maleDoctor} alt="Male Doctor" />
                        <img className="doct-2 h-[100%] md:h-auto md:w-[80%] absolute bottom-0 right-0 md:left-0 md:ml-56 opacity-0 md:opacity-100" src={femaleDoctor} alt="Female Doctor" />

                        <div className="top-badge hidden md:flex absolute md:bottom-16 left-0  w-[12rem] lg:w-[16rem] md:h-[4rem] lg:h-[5rem] bg-white/15 border-2 border-white/30 backdrop-blur-lg rounded-full items-center justify-center">
                            <PatientBadge />
                        </div>

                    </div>
                </div>
                <div className="top-badge flex md:hidden absolute top-24 border-l-0 w-[10rem] bg-white/15 border-2 border-white/30 backdrop-blur-lg rounded-r-full items-center justify-center">
                    <PatientBadge />
                </div>
                <div className="top-badge absolute hidden left-0 top-24 w-[16rem] h-[5rem] border-l-0 bg-white/15 border-2 border-white/30 backdrop-blur-lg rounded-r-full md:flex items-center justify-center">
                    <DoctorsBadge />
                </div>
            </div>



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
                        src={maleDoctor} alt="Male Doctor" />
                    <img
                        className="w-[300px] absolute right-[50%] translate-x-20 "
                        src={femaleDoctor}
                        alt="Female Doctor" />
                </div>

                <div className="top-badge flex absolute items-center justify-center top-[45%] left-2  
            w-fit h-[2rem]  md:h-[4rem]
            bg-white/15 border-2 border-white/30 backdrop-blur-lg rounded-full p-2">
                    <PatientBadge />
                </div>

                <div className="top-badge flex absolute right-2 md:top-[54%] top-[34%] 
            w-fit h-[2rem]   md:h-[4rem] p-2
            bg-white/15 border-2 border-white/30 backdrop-blur-lg rounded-full md:flex items-center justify-center">
                    <DoctorsBadge />
                </div>
            </div>
        </>
    )
}

export default LandingBanner
