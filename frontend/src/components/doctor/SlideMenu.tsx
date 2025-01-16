import { faRightFromBracket, faBars, faCalendarAlt, faMessage, faThLarge } from '@fortawesome/free-solid-svg-icons';
import { faNewspaper, faMoneyBill1 } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

function SlideMenu() {
    const [selected, setSelected] = useState('Dashboard')
    const [isOpen, setIsOpen] = useState(false);
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
            className={`lg:h-full w-full bg-gradient-to-l from-[#72b4e7] to-[#9fcced]  top-0 left-0 flex flex-col shadow-2xl z-40 overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'lg:w-[270px] h-full' : 'lg:w-[100px] h-20'}`}
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
                        className={`flex items-center gap-4 w-full px-3 py-2  rounded-full transition-all duration-500 active:scale-90  ${selected === item.label ? 'bg-white text-[#51AFF6] ' : 'hover:bg-white/20 text-white'}`}
                        onClick={()=>HandleSelected(item.label)}
                    >
                        <FontAwesomeIcon icon={item.icon} className="text-xl p-2  rounded-full pl-3" />
                        <p className={`transition-opacity duration-500 whitespace-nowrap ${isOpen ? 'opacity-100' : 'opacity-0'}`}>{item.label}</p>
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
