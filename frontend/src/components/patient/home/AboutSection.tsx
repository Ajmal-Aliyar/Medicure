import AboutDoctors from '../../../assets/doctors/aboutDoctorsCroped.png'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

gsap.registerPlugin(ScrollTrigger);

function AboutSection() {
    useGSAP(() => {
    const tl = gsap.timeline({scrollTrigger: {
        trigger: '.about-left',
        scroller: 'body',
        start: 'top 80%', 
        end: 'top 20%',
        scrub: true, 
    }})
        tl.from('.about-left', {
            x: -200,
            opacity: 0,
        },'anime1');
        tl.from('.about-right', {
            x: 200,
            opacity: 0,
        },'anime1');
    }, []);

    return (
        <div className="w-[100%] px-6 lg:px-28 py-5 lg:py-14  flex flex-col md:flex-row about overflow-hidden">
            <div className="w-[100%] md:w-[50%]  space-y-3 about-left">
                <p className="text-[#51aff6ce] font-semibold text-xl">About</p>
                <p className="font-bold text-2xl text-[#0c0b3eb5]">
                    Medicure is a team of experienced medical professionals
                </p>
                <p className="text-[#767676]">
                    At Medicure, we are revolutionizing the way you access and manage your healthcare. Our mission is to bridge the gap between patients and healthcare providers by offering a seamless platform for finding the best doctors, booking appointments, and managing medical records—all in one place.
                </p>
            </div>
            <div className="w-[100%] md:w-[50%] max-h-[50vh] relative flex justify-center items-center lg:-translate-y-10 about-right">
                <div className='w-full h-[60%] bg-gradient-to-t from-[#3d85bcce] via-[#51aff6ce] absolute bottom-0 rounded-b-[100px] shadow-lg'></div>
                <img className="object-cover h-full z-10" src={AboutDoctors} alt="Doctors" />
            </div>
        </div>
    )
}

export default AboutSection;
