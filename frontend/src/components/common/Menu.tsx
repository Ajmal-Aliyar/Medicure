
import { useGSAP } from '@gsap/react';
import 'font-awesome/css/font-awesome.min.css';
import gsap from 'gsap';
import { useState } from 'react';

function Menu() {
    const [isOpen, setIsOpen] = useState(false);
    
    useGSAP(() => {
        gsap.from('.navbar', {
            y: -200,
            opacity: 0,
            duration: 1.2
        });
    })
    return (
        <div className="navbar w-full px-6 lg:px-28 py-5 flex justify-between items-center opacity-100 text-[#0c0b3eb5] absolute z-30">
            <p className="text-[2rem] lg:text-[2.5rem] font-black">MEDI CURE</p>
            <nav className={`flex flex-col lg:flex-row items-center justify-center gap-5 lg:gap-20 ${isOpen ? 'block' : 'hidden'} lg:flex`}>
                <p className='font-bold'>Home</p>
                <p>Find Doctors</p>
                <p>Articles</p>
                <p>Contact</p>
            </nav>
            <i 
                className="fa fa-bars text-[25px] p-2 cursor-pointer lg:hidden"
                onClick={() => setIsOpen(!isOpen)}
            ></i>
            <i 
                className="fa fa-bars text-[25px] p-2 cursor-pointer lg:block hidden"
            ></i>
        </div>
    );
}

export default Menu;
