import { useNavigate } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import { RootState } from '../../../store/store';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import UserDriveBar from '../profile/UserDriveBar';

function Menu() {
    const { isAuthenticated, role } = useSelector((state: RootState) => state?.auth);
    const [isOpen, setIsOpen] = useState(false);
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
                <nav className="lg:flex flex-col hidden lg:flex-row items-center justify-center gap-5 lg:gap-20">
                    <NavLink
                        to="/user"
                        end
                        className={({ isActive }) =>
                            isActive
                                ? "font-bold cursor-pointer hover:scale-105 transition-all duration-300"
                                : "cursor-pointer hover:scale-105 transition-all duration-300"
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/user/find-doctors"
                        className={({ isActive }) =>
                            isActive
                                ? "font-bold cursor-pointer hover:scale-105 transition-all duration-300"
                                : "cursor-pointer hover:scale-105 transition-all duration-300"
                        }
                    >
                        Find Doctors
                    </NavLink>
                    <NavLink
                        to="/user/articles"
                        className={({ isActive }) =>
                            isActive
                                ? "font-bold cursor-pointer hover:scale-105 transition-all duration-300"
                                : "cursor-pointer hover:scale-105 transition-all duration-300"
                        }
                    >
                        Articles
                    </NavLink>
                    <NavLink
                        to="/user/contact"
                        className={({ isActive }) =>
                            isActive
                                ? "font-bold cursor-pointer hover:scale-105 transition-all duration-300"
                                : "cursor-pointer hover:scale-105 transition-all duration-300"
                        }
                    >
                        Contact
                    </NavLink>

                </nav>

                <div className="flex items-center gap-2 relative">
                    <div
                        className={`group/button overflow-hidden border-2 border-[#0c0b3eb5] rounded-lg px-5 lg:py-1 lg:px-7 lg:font-medium cursor-pointer transition-all transform  duration-300 active:scale-95 `}
                        onClick={() => {
                            if (isAuthenticated && role === 'user') {
                                navigate('/user/profile');
                            } else {
                                navigate('/user/auth');
                            }
                        }}
                    >
                        <div
                            className="absolute bg-blue-300 inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-85%)] opacity-50 group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(85%)]"
                        >
                            <div className="relative h-full w-10 bg-white/20"></div></div>
                        {isAuthenticated && role === 'user' ? 'profile' : 'Login'}
                    </div>
                    <i
                        className={`fa fa-bars text-[28px] p-2 cursor-pointer transition-all duration-500 transform ${isAuthenticated && role === 'user' ? 'block' : 'lg:hidden'}  ${isOpen ? '-rotate-90 ' : ''}`}
                        onClick={() => setIsOpen(!isOpen)}
                    ></i>
                    <nav
                        className={`flex-col overflow-hidden justify-center absolute top-full left-0 p-1 px-3 mt-2 bg-[#fefefe] rounded-md right-0 hidden lg:block transition-all duration-500 ease-in-out transform ${isOpen && isAuthenticated && role === 'user' ? 'h-44 opacity-100' : 'h-0 opacity-0 pointer-events-none'}`}
                    >
                        <UserDriveBar />
                    </nav>
                </div>
            </div>

            <div className={`lg:hidden flex items-center justify-between overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'h-44 opacity-100' : 'h-0 opacity-0 pointer-events-none'}`}>
                <span className='flex flex-col gap-4'>
                <NavLink
                        to="/user"
                        end
                        className={({ isActive }) =>
                            isActive
                                ? "font-bold cursor-pointer"
                                : "cursor-pointer "
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/user/find-doctors"
                        className={({ isActive }) =>
                            isActive
                                ? "font-bold cursor-pointer "
                                : "cursor-pointer "
                        }
                    >
                        Find Doctors
                    </NavLink>
                    <NavLink
                        to="/user/articles"
                        className={({ isActive }) =>
                            isActive
                                ? "font-bold cursor-pointer "
                                : "cursor-pointer"
                        }
                    >
                        Articles
                    </NavLink>
                    <NavLink
                        to="/user/contact"
                        className={({ isActive }) =>
                            isActive
                                ? "font-bold cursor-pointer"
                                : "cursor-pointer"
                        }
                    >
                        Contact
                    </NavLink>
                </span>
                <span className={`${isAuthenticated && role === 'user' ? '' : 'hidden'} text-end space-y-3`}>
                    <UserDriveBar />
                </span>
            </div>
        </div>
    );
}

export default Menu;
