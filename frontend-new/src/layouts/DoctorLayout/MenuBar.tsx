
import type { RootState } from '@/app/store';
import { useLogout } from '@/hooks';
import { Calendar, CircleUserRound, ClipboardPlus, Landmark, LayoutDashboard, LogOut, Menu, MessageSquare } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

type MenuItem = {
    icon: any;
    label: string;
    path: string;
};

export const MenuBar = () => {
    const [selected, setSelected] = useState('Dashboard');
    const [isOpen, setIsOpen] = useState(false);
const id = useSelector((state: RootState) => state.auth.user?.id);
    const navigate = useNavigate();
    const location = useLocation(); 
    const logout = useLogout()


    useEffect(() => {
        const currentPath = location.pathname;
        const activeItem = menuItems.find(item => item.path === currentPath);
        if (activeItem) {
            setSelected(activeItem.label);
        }
    }, [location.pathname]);

    const handleNav = () => setIsOpen(!isOpen);

    const menuItems: MenuItem[] = [
        { icon: <LayoutDashboard strokeWidth={3} />, label: 'Dashboard', path: '/doctor/dashboard' },
        { icon: <ClipboardPlus strokeWidth={3}/>, label: 'Appointments', path: '/doctor/appointments' },
        { icon: <Calendar strokeWidth={3}/>, label: 'Slots', path: '/doctor/slots' },
        { icon: <MessageSquare strokeWidth={3} /> , label: 'Chats', path: '/doctor/chats' },
        { icon: <Landmark strokeWidth={3}/>, label: 'Finances', path: '/doctor/finances' },
        { icon: <CircleUserRound strokeWidth={3} />, label: 'Profile', path: `/doctor/profile/${id}` },
    ];

    const handleSelected = (item: MenuItem) => {
        if (selected !== item.label) {
            setSelected(item.label);
            navigate(item.path);
        }
    };

    return (
        <div
            className={` w-full bg-gradient-to-l from-[#72b4e7] to-[#9fcced] top-0 left-0 flex flex-col shadow-md z-40 overflow-hidden transition-all duration-500 ease-in-out sticky lg:block lg:h-screen ${isOpen ? 'lg:w-[270px] h-screen ' : 'lg:w-[100px] h-20'}`}
        >

            <nav
                className="flex items-center cursor-pointer text-secondary p-4 gap-4"
                onClick={handleNav}
            >
                <div className="text-3xl pl-5">
                <Menu size={26} strokeWidth={3}/>
                </div>
                <p className={`text-2xl font-black whitespace-nowrap transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>MEDI CURE</p>
            </nav>

            <div className="flex flex-col items-start mt-5 gap-1 px-4">
                {menuItems.map((item, index) => (
                    <div
                        key={index}
                        className={`flex items-center gap-4 w-full px-3 py-2 rounded-full transition-all duration-500 active:scale-90  ${selected === item.label ? 'bg-white text-[#51AFF6]' : 'hover:bg-white/20 text-white'}`}
                        onClick={() => handleSelected(item)}
                    >
                        <div className={`text-xl p-2 rounded-full pl-3 duration-300 ${!isOpen? '-translate-x-1' : '' }`}>{item.icon}</div>
                        <p className={`transition-opacity duration-500 whitespace-nowrap ${isOpen ? 'opacity-100' : 'opacity-0'}`}>{item.label}</p>
                    </div>
                ))}
                <div
                    className={`flex items-center gap-4 w-full p-3 rounded-lg transition-all duration-500 hover:bg-white/20 active:scale-95 cursor-pointer`} 
                    onClick={logout}
                >
                    <div className={`text-xl p-2 rounded-full pl-3 text-white duration-300 rotate-180 ${!isOpen? '-translate-x-1' : '' }`} >
                    <LogOut strokeWidth={3}/>
                    </div>
                    <p className={`transition-opacity duration-500 whitespace-nowrap text-white ${isOpen ? 'opacity-100' : 'opacity-0'}`}>Log out</p>
                </div>
            </div>
        </div>
    );
}

