import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper, faMoneyBill1 } from '@fortawesome/free-regular-svg-icons';
import { faRightFromBracket, faBars, faCalendarAlt, faMessage, faThLarge } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function SlideMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState('Dashboard')
    const handleNav = () => setIsOpen(!isOpen);

    const menuItems = [
        { icon: faThLarge, label: 'Dashboard' },
        { icon: faCalendarAlt, label: 'Appointments' },
        { icon: faMessage, label: 'Messages' },
        { icon: faNewspaper, label: 'Articles' },
        { icon: faMoneyBill1, label: 'Finance' },
    ];

    const HandleSelected = (item:string) => {
        setSelected(item)
    }

    return (
        <div
            className={`h-screen bg-gradient-to-l from-[#a9c9df] to-[#9fcced]  relative flex flex-col shadow-2xl z-40 overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'w-[270px]' : 'w-[100px]'}`}
        >

            <nav
                className="flex items-center cursor-pointer text-[#0c0b3eb5] "
                onClick={handleNav}
            >
                <FontAwesomeIcon icon={faBars} className="text-3xl " />
                <p className={`text-2xl font-black whitespace-nowrap transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>MEDI CURE</p>
            </nav>


            <div className="flex flex-col items-start gap-1">
                {menuItems.map((item, index) => (
                    <div
                        key={index}
                        className={`flex items-center gap-4 w-full justify-center transition-all duration-500 active:scale-90  ${selected === item.label ? 'bg-white text-[#51AFF6] ' : 'hover:bg-white/20 text-white'}`}
                        onClick={()=>HandleSelected(item.label)}
                    >
                        <FontAwesomeIcon icon={item.icon} className="text-xl p-2  rounded-full " />
                        <p className={`transition-opacity duration-500 whitespace-nowrap ${isOpen ? 'opacity-100' : 'opacity-0 visible-none'}`}>{item.label}</p>
                    </div>
                ))}
                <div
                        className={`flex items-center gap-4 w-full p-3 rounded-lg transition-all duration-500 hover:bg-white/20 active:scale-95`} 
                    >
                        <FontAwesomeIcon icon={faRightFromBracket} className="text-xl p-2 pl-3  rounded-full text-white rotate-180 " />
                        <p className={`transition-opacity duration-500 whitespace-nowrap text-white ${isOpen ? 'opacity-100' : 'opacity-0'}`}>Log out</p>
                    </div>
            </div>
        </div>
    );
}

export default SlideMenu;
