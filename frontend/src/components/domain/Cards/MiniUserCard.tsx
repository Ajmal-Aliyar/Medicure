import { DEFAULT_IMAGE } from "@/app/constants";
import type { AppointmentUserInfo } from "@/types/appointment";
import { useNavigate } from "react-router-dom";

interface MiniUserCardProps {
    showBothUsers: boolean;
    type: string;
    user: AppointmentUserInfo;
    role: string;
}

const MiniUserCard = ({ user, showBothUsers, type, role }: MiniUserCardProps) => {
    const navigate = useNavigate()
    return (
        <div className={`group flex items-center gap-4 relative
                    ${showBothUsers && "border p-2 rounded-md border-border cursor-pointer pr-4"}`}>
                        <div className="absolute rounded-md rounded-bl-none text-white -top-3 -right-3 px-1 bg-black/60 opacity-0 group-hover:opacity-100 transition-all"
                        onClick={() => navigate(`/${role}/${user.id}`)}>view</div>
            <img
                src={user.profileImage || DEFAULT_IMAGE}
                alt={user.name}
                className="w-16 h-16 object-cover rounded-full border border-blue-200"
            />
            <div>
                <p className="text-lg font-semibold text-[#2f3c62]">
                    {`${role === "doctor" ? "Dr." : ""} ${user.name}`}
                </p>
                {user.specialization && (
                    <p className="text-sm text-blue-400 font-medium">
                        {user.specialization}
                    </p>
                )}
                {user.age && (
                    <p className="text-sm text-gray-400">Age: {user.age}</p>
                )}
                {!showBothUsers && <p className="text-xs text-gray-400 mt-1">
                    Type: <span className="capitalize">{type}</span>
                </p>}
            </div>
        </div>
    )
}

export default MiniUserCard