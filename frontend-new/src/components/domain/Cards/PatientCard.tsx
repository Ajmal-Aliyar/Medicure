import { DEFAULT_IMAGE } from "@/app/constants";
import type { PatientCardDetails } from "@/types/card";
import { formatDateToLong } from "@/utils/formatDate";
import { SquareArrowOutUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Props = {
    patient: PatientCardDetails;
    showMeta?: boolean;
    onView?: (key: string) => void
    className?: string;
    isMe?: boolean
};

export const PatientCard = ({ patient, className, isMe = false}: Props) => {
    const navigate = useNavigate()
    console.log(patient, 'dsf');
    
    return (
        <div className={`relative bg-surface p-4 flex flex-col gap-3 overflow-hidden ${className}`}>
            <div className="flex items-center gap-4">
                <img
                    src={patient?.profileImage || DEFAULT_IMAGE}
                    alt={patient?.fullName}
                    className="w-28 h-28 rounded-md object-cover shadow-md"
                />
                <div className="flex flex-col flex-1">
                    <h3 className="text-lg font-semibold text-secondary">{patient?.fullName}</h3>
                    <p className="text-sm text-primary">{formatDateToLong(patient?.dob as string)} ({patient?.gender})</p>
                    <p className="text-sm text-muted-dark">{patient?.mobile}</p>
                    <div className="flex items-center gap-2 text-sm text-red-600">
                        {patient?.bloodGroup}
                    </div>
                </div>
                {!isMe && <SquareArrowOutUpRight className="mb-auto text-secondary hover:text-primary active:scale-95 cursor-pointer" size={15} onClick={() => navigate(`/patient/${patient?.id}`)} />}
            </div>

        </div>
    );
};
