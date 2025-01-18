import { faRightFromBracket, faBars, faCalendarAlt, faMessage, faThLarge, faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faNewspaper, faMoneyBill1 } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { logOutUser } from '../../../store/slices/authSlices/AuthSlice';
import { useDispatch } from 'react-redux';
import { clearWarning, setExtra, setWarning } from '../../../store/slices/commonSlices/notificationSlice';
import { AppDispatch } from '../../../store/store';

type MenuItem = {
    icon: IconDefinition;
    label: string;
    path: string;
};

function SlideMenu() {
    const [selected, setSelected] = useState('Dashboard');
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation(); 

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        const currentPath = location.pathname;
        const activeItem = menuItems.find(item => item.path === currentPath);
        if (activeItem) {
            setSelected(activeItem.label);
        }
    }, [location.pathname]);

    const handleNav = () => setIsOpen(!isOpen);

    const menuItems: MenuItem[] = [
        { icon: faThLarge, label: 'Dashboard', path: '/doctor/dashboard' },
        { icon: faCalendarAlt, label: 'Appointments', path: '/doctor/appointments' },
        { icon: faMessage, label: 'Messages', path: '/doctor/messages' },
        { icon: faNewspaper, label: 'Articles', path: '/doctor/articles' },
        { icon: faMoneyBill1, label: 'Finance', path: '/doctor/finance' },
        { icon: faUser, label: 'Profile', path: '/doctor/profile' },
    ];

    const handleSelected = (item: MenuItem) => {
        if (selected !== item.label) {
            setSelected(item.label);
            navigate(item.path);
        }
    };

    const handleLogout = () => {
        dispatch(setWarning("Are you sure you want to log out?"))
        dispatch(setExtra(() => {
            dispatch(clearWarning())
             dispatch(logOutUser())
            }));
    };

    return (
        <div
            className={`lg:h-full w-full bg-gradient-to-l from-[#72b4e7] to-[#9fcced] top-0 left-0 flex flex-col shadow-2xl z-40 overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'lg:w-[270px] h-full' : 'lg:w-[100px] h-20'}`}
        >

            <nav
                className="flex items-center cursor-pointer text-[#0c0b3eb5] p-4 gap-4"
                onClick={handleNav}
            >
                <FontAwesomeIcon icon={faBars} className="text-3xl pl-5" />
                <p className={`text-2xl font-black whitespace-nowrap transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>MEDI CURE</p>
            </nav>

            <div className="flex flex-col items-start mt-5 gap-1 px-4">
                {menuItems.map((item, index) => (
                    <div
                        key={index}
                        className={`flex items-center gap-4 w-full px-3 py-2 rounded-full transition-all duration-500 active:scale-90  ${selected === item.label ? 'bg-white text-[#51AFF6]' : 'hover:bg-white/20 text-white'}`}
                        onClick={() => handleSelected(item)}
                    >
                        <FontAwesomeIcon icon={item.icon} className={`text-xl p-2 rounded-full pl-3 duration-300 ${!isOpen? '-translate-x-1' : '' }`}  />
                        <p className={`transition-opacity duration-500 whitespace-nowrap ${isOpen ? 'opacity-100' : 'opacity-0'}`}>{item.label}</p>
                    </div>
                ))}
                <div
                    className={`flex items-center gap-4 w-full p-3 rounded-lg transition-all duration-500 hover:bg-white/20 active:scale-95 cursor-pointer`} 
                    onClick={handleLogout}
                >
                    <FontAwesomeIcon icon={faRightFromBracket} className={`text-xl p-2 rounded-full pl-3 text-white duration-300 rotate-180 ${!isOpen? '-translate-x-1' : '' }`} />
                    <p className={`transition-opacity duration-500 whitespace-nowrap text-white ${isOpen ? 'opacity-100' : 'opacity-0'}`}>Log out</p>
                </div>
            </div>
        </div>
    );
}

export default SlideMenu;
