import { faRightFromBracket, faBars, faCalendarAlt, faThLarge, faUserDoctor, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill1 } from '@fortawesome/free-regular-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';



function SlideMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState('');
    const location = useLocation(); 
    const navigate = useNavigate();  

    useEffect(() => {
            const currentPath = location.pathname;
            const activeItem = menuItems.find(item => item.path === currentPath);
            if (activeItem) {
                setSelected(activeItem.label);
            }
        }, [location.pathname]);

    const handleNav = () => setIsOpen(!isOpen);

    const menuItems = [
        { icon: faThLarge, label: 'Dashboard', path: '/admin/dashboard' },
        { icon: faUserDoctor, label: 'Doctors', path: '/admin/doctors' },
        { icon: faUserAlt, label: 'Patients', path: '/admin/patients' },
        { icon: faCalendarAlt, label: 'Appointments', path: '/admin/appointments' },  
        { icon: faMoneyBill1, label: 'Finance', path: '/admin/finance' },
    ];

    const handleSelected = (label: string, path:string) => {
        if (selected !== label) {
            setSelected(label);
            navigate(path);
        }
    };

    return (
        <div
            className={`lg:h-screen bg-[#16423C] fixed lg:relative flex flex-col z-40 overflow-hidden transition-all duration-500 ease-in-out w-full  ${isOpen ? 'lg:w-[280px] h-[460px]' : 'lg:w-[100px] h-[68px]'}`}
        >
             
            <nav
                className="flex items-center cursor-pointer text-[#C4DAD2] pl-4 gap-3 py-4"
                onClick={handleNav}
            >
                <FontAwesomeIcon icon={faBars} className={`text-[30px] duration-300 ${isOpen ? '' : 'lg:translate-x-3'}`} />
                <p className={`text-3xl font-black whitespace-nowrap transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'lg:opacity-0'}`}>MEDI CURE</p>
            </nav>

            <div className="flex flex-col items-start">
                {menuItems.map((item, index) => (
                    <div
                        key={index}
                        className={`flex items-center gap-4 w-full p-3 transition-all duration-500 active:scale-90  ${selected === item.label ? 'bg-[#E9EFEC] text-[#16423C]' : 'hover:bg-white/20 text-[#E9EFEC]'}`}
                        onClick={() => handleSelected(item.label, item.path)} 
                    >
                        <FontAwesomeIcon icon={item.icon} className={`text-2xl p-2 rounded-full duration-500 ${isOpen ? '' : 'lg:translate-x-3'}`} />
                        <p className={`transition-opacity duration-500 whitespace-nowrap ${isOpen ? 'opacity-100' : 'lg:opacity-0'}`}>{item.label}</p>
                    </div>
                ))}
                <div className="flex items-center gap-4 w-full p-3 rounded-lg transition-all duration-500 hover:bg-white/20 active:scale-95">
                    <FontAwesomeIcon icon={faRightFromBracket} className={`text-2xl p-2 text-[#E9EFEC] rotate-180 rounded-full duration-300 ${isOpen ? '' : 'lg:translate-x-3'}`} />
                    <p className={`transition-opacity duration-500 whitespace-nowrap text-[#E9EFEC] ${isOpen ? 'opacity-100' : 'lg:opacity-0'}`}>Log out</p>
                </div>
            </div>
        </div>
    );
}

export default SlideMenu;
