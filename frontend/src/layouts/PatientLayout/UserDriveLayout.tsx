import type { RootState } from "@/app/store";
import AppointmentDetails from "@/components/domain/Appointment/AppointmentDetails";
import { PrescriptionModal } from "@/components/domain/Modals/PrescriptionModal";
import { ChevronLeft } from "lucide-react";
import { useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const UserDriveLayout = () => {
    const { appointmentId, prescription } = useSelector((state: RootState) => state.global)
    const navigate = useNavigate()
    const menuItems = [
        { name: "Account", path: "/user/profile" },
        { name: "Appointments", path: "/user/appointments" },

        { name: "Feedbacks", path: "/user/feedbacks" },
        { name: "Medical Records", path: "/user/medical-records" },
        { name: "Finances", path: "/user/finances" },
    ];

    return (
        <div className="w-screen h-screen flex justify-center items-center md:p-6 bg-[#eeeeee] ">
            <div className="w-full h-full rounded-md bg-[#f9f9f9] shadow-lg flex flex-col overflow-hidden">
                <div className="border-b p-5 w-full max-h-[80px] md:flex hidden items-center cursor-pointer"
                    onClick={() => navigate('/find')}>
                    <ChevronLeft />
                    <p className="text-[#0c0b3eb5] text-lg font-medium">My Drive</p>
                </div>
                <div className="flex flex-1 h-full overflow-hidden">
                    <div className="w-[200px] border-r text-gray-400 hidden md:block">
                        {menuItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `block p-3 border-b ${isActive
                                        ? "text-[#0c0b3eb5] font-semibold bg-primary/30"
                                        : "hover:bg-gray-100"
                                    }`
                                }
                            >
                                {item.name}
                            </NavLink>
                        ))}
                    </div>

                    <div className="flex-1 flex flex-col h-full overflow-hidden">
                        <div className="p-2 w-full flex flex-col gap-4 h-full overflow-hidden">
                            <div className="flex-1 overflow-y-auto">
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            {appointmentId && <AppointmentDetails appointmentId={appointmentId} />}
            {prescription.isOpen && <div className="w-screen h-screen bg-black/80 fixed top-0 left-0 z-40">
                <PrescriptionModal prescriptionId={prescription.prescriptionId} />
            </div>}
        </div>
    );
};

export default UserDriveLayout;
