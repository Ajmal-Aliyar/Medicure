import maleDoctor from "../../../assets/doctors/homepage-male.png"
import femaleDoctor from "../../../assets/doctors/homepage-female.png"
import DoctorsBadge from "../../auth/DoctorsBadge"
import PatientBadge from "../../auth/PatientsBadge"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

function LandingBanner() {
    useGSAP(() => {
        const tl = gsap.timeline()
        tl.from('.hero-text',{
            x: -200,
            opacity: 0,
            duration: 0.7
        },'anime1')
        tl.from('.hero-sub-text',{
            x: -200,
            opacity: 0,
            delay:0.2,
            duration: 0.7
        },'anime1')
        tl.from('.doct-1', {
            y: 80,
            duration: 2
        },'anime1'); 
        tl.from('.doct-2', {
            y: 100,
            duration: 2
        },'anime1');
        tl.from('.top-badge',{
            opacity: 0,
            x:-100,
            scale:0.4,
            duration: 0.7,
        },'anime2')
        
        
        tl.to('.book-bar',{
            y:-50,
            duration:2,
            ease:'bounce'
        },'-=0.4')
        
        tl.to('.mid-img ',{
            scale:1.3,
            duration:1.8,
            ease:"back.out"
        },)
    });
  return (
    <div className="relative w-full h-[100vh] md:h-[80vh] bg-gradient-to-b from-[#51aff6ce] to-[#D9E9F6] after:w-[20vw] after:h-[50vh] after:bg-[rgba(167,216,253,0.21)] after:absolute after:-top-20 after:-left-40 after:rotate-45 before:w-[20rem] before:h-[38rem] before:rounded-full before:bg-[#cce2f43e] before:-bottom-28 before:right-0 before:absolute overflow-hidden">
                    <div className="absolute bottom-0  h-[70%] w-full px-6 lg:px-28 flex flex-col md:flex-row">
                        <div className="w-full md:w-[45%] md:h-full h-[50%] md:mt-16">
                            <p className="hero-text text-[#0c0b3eb5] text-3xl md:text-4xl lg:text-5xl font-semibold tracking-wider leading-tight ">Your Partner in <br /> Health and Wellness</p>
                            <p className="hero-sub-text text-[#0c0b3eb5] mt-4 text-xs md:text-base">We are committed to providing you the best medical and healthcare services to help you live healthier and happier</p>
                        </div>
                        <div className="w-full md:w-[50%] h-full flex items-end justify-center md:justify-end relative mt-8 md:mt-0">

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
  )
}

export default LandingBanner
