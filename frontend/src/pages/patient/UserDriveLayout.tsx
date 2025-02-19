import { NavLink, Outlet } from "react-router-dom";

const UserDriveLayout = () => {
    const menuItems = [
        { name: "Medical Records", path: "/user/drive/medical-records" },
        { name: "Appointments", path: "/user/drive/appointments" },
        { name: "Feedbacks", path: "/user/drive/feedbacks" },
        { name: "Payments", path: "/user/drive/payments" },
    ];

    return (
        <div className="w-screen h-screen flex justify-center items-center md:p-6 bg-[#eeeeee] ">
            <div className="w-full md:w-4/5 lg:w-3/4 h-[90%] mt-16 rounded-md bg-[#f9f9f9] shadow-lg flex flex-col overflow-hidden">
                <div className="border-b p-5 w-full max-h-[80px] hidden md:block">
                    <p className="text-[#0c0b3eb5] text-lg font-medium">My Drive</p>
                </div>
                <div className="flex h-full">
                    <div className="w-[200px] border-r text-gray-400 hidden md:block">
                        {menuItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `block p-3 border-b ${isActive
                                        ? "text-[#0c0b3eb5] font-semibold bg-gray-200"
                                        : "hover:bg-gray-100"
                                    }`
                                }
                            >
                                {item.name}
                            </NavLink>
                        ))}
                    </div>
                    <div className="flex flex-col flex-grow overflow-hidden">
                        <div className="p-2 w-full flex flex-col gap-4">
                            <div className="flex-grow overflow-y-auto  p-2">
                                <Outlet />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default UserDriveLayout;
