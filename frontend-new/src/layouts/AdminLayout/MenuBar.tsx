
import { useLogout } from '@/hooks';
import { Accessibility, Calendar, ClipboardPlus, Landmark, LayoutDashboard, LogOut, Menu, MessageSquare, Stethoscope } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

type MenuItem = {
    icon: any;
    label: string;
    path: string;
};

export const MenuBar = () => {
    const [selected, setSelected] = useState('Dashboard');
    const [isOpen, setIsOpen] = useState(false);
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
        { icon: <LayoutDashboard strokeWidth={3} />, label: 'Dashboard', path: '/admin/dashboard' },
        { icon: <Stethoscope strokeWidth={3}/>, label: 'Doctors', path: '/admin/doctors' },
        { icon: <Accessibility strokeWidth={3}/>, label: 'Patients', path: '/admin/patients' },
        { icon: <Calendar strokeWidth={3}/>, label: 'Slots', path: '/admin/slots' },
        { icon: <ClipboardPlus strokeWidth={3}/>, label: 'Appointments', path: '/admin/appointments' },
        { icon: <MessageSquare strokeWidth={3} /> , label: 'Chats', path: '/admin/chats' },
        { icon: <Landmark strokeWidth={3}/>, label: 'Finances', path: '/admin/finances' },
    ];

    const handleSelected = (item: MenuItem) => {
        if (selected !== item.label) {
            setSelected(item.label);
            navigate(item.path);
            setIsOpen(false)
        }
    };

    return (
        <div
            className={`lg:h-full w-full bg-gradient-to-l from-[#72b4e7] to-[#9fcced] flex flex-col lg:shadow-2xl z-40 overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'lg:w-[270px] min-h-screen max-h-screen' : 'lg:w-[100px] min-h-[10vh] max-h-[10vh] lg:min-h-screen'}`}
        >

            <nav
                className="flex items-center cursor-pointer text-[#0c0b3eb5] p-4 gap-4"
                onClick={handleNav}
            >
                <div className="text-3xl pl-5">
                <Menu size={26} strokeWidth={3}/>
                </div>
                <p className={`text-2xl font-black whitespace-nowrap transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'lg:opacity-0'}`}>MEDI CURE</p>
            </nav>

            <div className="flex flex-col overflow-y-auto items-start mt-5 gap-1 px-4"  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
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

