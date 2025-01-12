import { useEffect, useState } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';


function Menu() {
    const [isOpen, setIsOpen] = useState(false);
    const { isAuthenticated, role } = useSelector((state: RootState) => state?.user);
    const navigate = useNavigate();

    useGSAP(() => {
        gsap.from('.navbar', {
            y: -200,
            opacity: 0,
            duration: 1.2,
            ease: 'power4.out',
        });
    });
    useEffect(() => {
        const handleScroll = () => {
            setIsOpen(false);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <div className="navbar w-full px-6 lg:px-28 py-1 md:py-3 flex-col lg:flex-row justify-end opacity-100 text-[#0c0b3eb5] absolute z-30 bg-white lg:bg-transparent">
            <div className='w-full flex justify-between items-center'>
                <p className="text-[2rem] lg:text-[2.5rem] font-black">MEDI CURE</p>
                <nav className={`lg:flex flex-col hidden lg:flex-row items-center justify-center gap-5 lg:gap-20`}>
                    <p className="font-bold cursor-pointer hover:scale-105 transition-all duration-300">Home</p>
                    <p className="cursor-pointer hover:scale-105 transition-all duration-300">Find Doctors</p>
                    <p className="cursor-pointer hover:scale-105 transition-all duration-300">Articles</p>
                    <p className="cursor-pointer hover:scale-105 transition-all duration-300">Contact</p>
                </nav>

                <div className="flex items-center gap-2 relative">
                    <div
                        className={`border-2 border-[#0c0b3eb5] rounded-lg px-5 lg:py-1 lg:px-7 lg:font-medium cursor-pointer transition-all transform  duration-300 hover:scale-105 `}
                        onClick={() => {
                            if (isAuthenticated && role === 'user') {
                                navigate('/user/profile');
                            } else {
                                navigate('/user/auth');
                            }
                        }}
                    >
                        {isAuthenticated && role === 'user' ? 'profile' : 'Login'}
                    </div>
                    <i
                        className={`fa fa-bars text-[28px] p-2 cursor-pointer transition-all duration-100 transform ${isAuthenticated && role === 'user'?'block':'lg:hidden'}  ${isOpen ? '-rotate-90 ' : ''}`}
                        onClick={() => setIsOpen(!isOpen)}
                    ></i>
                    <nav
                        className={`flex-col justify-center absolute top-full left-0 p-1 px-3 mt-2 bg-[#fefefe] rounded-md right-0 hidden lg:block transition-all duration-300 ease-in-out transform ${isOpen && isAuthenticated && role === 'user' ?'h-36 opacity-100' : 'h-0 opacity-0 pointer-events-none'}`}
                    >
                        <p className="cursor-pointer my-2 hover:scale-105 duration-300">Appointments</p>
                        <p className="cursor-pointer my-2 hover:scale-105 duration-300">Medical records</p>
                        <p className="cursor-pointer my-2 hover:scale-105 duration-300">Payments</p>
                        <p className="cursor-pointer my-2 hover:scale-105 duration-300">Feedback</p>
                    </nav>
                </div>
            </div>

            <div className={`lg:hidden flex items-center justify-between overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'h-40 opacity-100' : 'h-0 opacity-0 pointer-events-none'}`}>
                <span className='space-y-3'>
                    <p className="cursor-pointer">Home</p>
                    <p className="cursor-pointer">Find Doctors</p>
                    <p className="cursor-pointer">Articles</p>
                    <p className="cursor-pointer">Contact</p>
                </span>
                <span className='text-end space-y-3'>
                    <p className="cursor-pointer">Appointments</p>
                    <p className="cursor-pointer">Medical records</p>
                    <p className="cursor-pointer">Payments</p>
                    <p className="cursor-pointer">Feedback</p>
                </span>
            </div>
        </div>
    );
}

export default Menu;
