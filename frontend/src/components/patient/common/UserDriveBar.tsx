import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { clearWarning, setExtra, setWarning } from '../../../store/slices/commonSlices/notificationSlice';
import { logOutUser } from '../../../store/slices/commonSlices/AuthSlice';
import { AppDispatch } from '../../../store/store';
import { BookText, Library, LogOut, MessageSquareText, Wallet } from 'lucide-react';

function UserDriveBar() {
    const dispatch = useDispatch<AppDispatch>();

    const handleLogout = () => {
        dispatch(setWarning("Are you sure you want to log out?"));
        dispatch(setExtra(() => {
            dispatch(clearWarning());
            dispatch(logOutUser());
        }));
    };

    const menuItems = [
        { name: "Medical Records", path: "/user/drive/medical-records", icon: <Library size={20} color="#0c0b3eb5" strokeWidth={2.75} /> },
        { name: "Appointments", path: "/user/drive/appointments", icon: <BookText size={20} color="#0c0b3eb5" strokeWidth={2.75} /> },
        { name: "Feedback", path: "/user/drive/feedbacks", icon: <MessageSquareText size={20} color="#0c0b3eb5" strokeWidth={2.75} /> },
        { name: "Payments", path: "/user/drive/payments", icon: <Wallet size={20} color="#0c0b3eb5" strokeWidth={2.75} /> },
    ];

    return (
        <div className="flex flex-col ">
            {menuItems.map((item) => (
                <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                        `cursor-pointer my-2 hover:lg:scale-105 hover:translate-x-1 duration-300 ${
                            isActive ? "text-[#0c0b3eb5] font-semibold" : "text-[#0c0b3eb5]"
                        }`
                    }
                >
                    <div className="flex gap-1 items-center">
                        {item.icon}
                        <span className="whitespace-nowrap">{item.name}</span>
                    </div>
                </NavLink>
            ))}
            <p
                className="cursor-pointer my-2 hover:lg:scale-105 duration-300 text-[#d21414d3] hover:translate-x-1 flex gap-1"
                onClick={handleLogout}
            >
                <div className='rotate-180'><LogOut size={20} color="#d21414d3" strokeWidth={2.75} /></div>
                Logout
            </p>
        </div>
    );
}

export default UserDriveBar;
