import { useGSAP } from '@gsap/react'
import ConsultImg from '../../assets/external/consulting.jpg'
import gsap from 'gsap'

function WhyChooseUs() {
    useGSAP(()=>{
        gsap.from('.choose-text',{
            y:-100,
            opacity:0,
            scrollTrigger : {
                trigger:'.choose-text',
                scroller:'body',
                start : 'top 70%',
                end : 'top 30%',
                scrub:true
            }
        })
        gsap.from('.choose-left',{
            x:-200,
            opacity:0,
            scrollTrigger : {
                trigger:'.choose-left',
                scroller:'body',
                start : 'top 70%',
                end : 'top 30%',
                scrub:true
            }
        })
        gsap.from('.item',{
            x:200,
            opacity:0,
            stagger:0.2,
            scrollTrigger : {
                trigger:'.item',
                scroller:'body',
                start : 'top 70%',
                end : 'top 30%',
                scrub:true
            }
        })
    })
    return (
        <div className="w-full px-6 lg:px-28 py-5 lg:py-14 flex flex-col items-center overflow-hidden">
            <p className="choose-text font-semibold text-center text-4xl text-[#0c0b3eb5] py-10 w-auto">
                Why Choose Us
            </p>
            <div className="w-full flex flex-col md:flex-row py-4 gap-7">
                <div className="choose-left   md:w-[50%] w-[100%] flex justify-center">
                    <img
                        className="object-cover w-full rounded-xl shadow-lg"
                        src={ConsultImg}
                        alt="Consultation"
                    />
                </div>
                <div className="choose-right grid md:grid-cols-2 md:grid-rows-2 md:w-[50%] w-[100%] gap-3">
                    <div className='p-2 space-y-2 item'>
                        <p className="bg-[#51aff6ce] w-8 h-8 rounded-full flex items-center justify-center text-white ">1</p>
                        <p className="font-bold text-md text-[#0c0b3eb5]">
                            Experienced Medical Proffessionals
                        </p>
                        <p className="text-[#767676] text-xs">
                            Connects you with a network of highly qualified and experienced medical professionals dedicated to providing exceptional care. From trusted general practitioners to renowned specialists,
                            every professional on our platform is carefully vetted to ensure you
                            receive the best healthcare experience tailored to your needs.</p>
                    </div>
                    <div className='p-2 space-y-2 item'>
                        <p className="bg-[#51aff6ce] w-8 h-8 rounded-full flex items-center justify-center text-white ">2</p>
                        <p className="font-bold text-md text-[#0c0b3eb5]">
                            Comprehensive Services
                        </p>
                        <p className="text-[#767676] text-xs">
                        Provides a complete range of healthcare solutions, including doctor consultations, diagnostic tests,
                         wellness programs, health tracking, and medication management. Whether it's 
                        preventive care or specialized treatment, we ensure all your health needs are covered in one place for a seamless experience.</p>
                    </div>
                    <div className='p-2 space-y-2 item'>
                        <p className="bg-[#51aff6ce] w-8 h-8 rounded-full flex items-center justify-center text-white ">3</p>
                        <p className="font-bold text-md text-[#0c0b3eb5]">
                        State-of-the-Art Facilities
                        </p>
                        <p className="text-[#767676] text-xs">
                        Experience top-quality healthcare with access to advanced technology, modern equipment, and cutting-edge facilities designed for precision and excellence. Our platform ensures you receive care in environments that prioritize safety, comfort, and innovation, delivering a superior healthcare experience at every step.</p>
                    </div>
                    <div className='p-2 space-y-2 item'>
                        <p className="bg-[#51aff6ce] w-8 h-8 rounded-full flex items-center justify-center text-white ">4</p>
                        <p className="font-bold text-md text-[#0c0b3eb5]">
                        Pateint-Centered Approach
                        </p>
                        <p className="text-[#767676] text-xs">
                        We prioritize your well-being by delivering personalized care tailored to your unique needs. Our platform is designed to empower patients, ensuring convenience, transparency, and support at every step of your healthcare journey.</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default WhyChooseUs
