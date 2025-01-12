import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper, faMoneyBill1 } from '@fortawesome/free-regular-svg-icons';
import { faRightFromBracket, faBars, faCalendarAlt, faMessage, faThLarge } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SlideMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState('Dashboard');
    const navigate = useNavigate();  

    const handleNav = () => setIsOpen(!isOpen);

    const menuItems = [
        { icon: faThLarge, label: 'Dashboard', path: '/admin/dashboard' },
        { icon: faCalendarAlt, label: 'Appointments', path: '/admin/appointment' },  
        { icon: faMessage, label: 'Messages', path: '/admin/messages' },
        { icon: faNewspaper, label: 'Articles', path: '/admin/articles' },
        { icon: faMoneyBill1, label: 'Finance', path: '/admin/finance' },
    ];

    const HandleSelected = (item: string, path?: string) => {
        setSelected(item);
        if (path) navigate(path);  
    }

    return (
        <div
            className={`lg:h-screen bg-gradient-to-l from-[#a9c9df] to-[#9fcced] fixed lg:relative flex flex-col shadow-2xl z-40 overflow-hidden transition-all duration-500 ease-in-out w-full  ${isOpen ? 'lg:w-[280px] h-[460px]' : 'lg:w-[100px] h-[68px]'}`}
        >
            <nav
                className="flex items-center cursor-pointer text-[#0c0b3eb5] pl-4 gap-3 py-4"
                onClick={handleNav}
            >
                <FontAwesomeIcon icon={faBars} className={`text-[30px] duration-300 ${isOpen ? '' : 'lg:translate-x-3'}`} />
                <p className={`text-3xl font-black whitespace-nowrap transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'lg:opacity-0'}`}>MEDI CURE</p>
            </nav>

            <div className="flex flex-col items-start">
                {menuItems.map((item, index) => (
                    <div
                        key={index}
                        className={`flex items-center gap-4 w-full p-3 transition-all duration-500 active:scale-90  ${selected === item.label ? 'bg-white text-[#51AFF6]' : 'hover:bg-white/20 text-white'}`}
                        onClick={() => HandleSelected(item.label, item.path)} 
                    >
                        <FontAwesomeIcon icon={item.icon} className={`text-2xl p-2 rounded-full duration-300 ${isOpen ? '' : 'lg:translate-x-3'}`} />
                        <p className={`transition-opacity duration-500 whitespace-nowrap ${isOpen ? 'opacity-100' : 'lg:opacity-0'}`}>{item.label}</p>
                    </div>
                ))}
                <div className="flex items-center gap-4 w-full p-3 rounded-lg transition-all duration-500 hover:bg-white/20 active:scale-95">
                    <FontAwesomeIcon icon={faRightFromBracket} className={`text-2xl p-2 text-white rotate-180 rounded-full duration-300 ${isOpen ? '' : 'lg:translate-x-3'}`} />
                    <p className={`transition-opacity duration-500 whitespace-nowrap text-white ${isOpen ? 'opacity-100' : 'lg:opacity-0'}`}>Log out</p>
                </div>
            </div>
        </div>
    );
}

export default SlideMenu;
