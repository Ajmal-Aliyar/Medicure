import { DEFAULT_IMAGE } from "@/app/constants";
import type { DoctorCardDetails } from "@/types/card";
import type { FilterDoctorSummary } from "@/types/doctor";
import { ShieldCheck, SquareArrowOutUpRight } from "lucide-react";


type Props = {
  doctor: FilterDoctorSummary | DoctorCardDetails;
  showMeta?: boolean;
  onView: (key: string) => void
  className?: string;
  isMe?: boolean
};

export const DoctorCard = ({ doctor, showMeta = false, onView, className, isMe = false }: Props) => {
  return (
    <div className={`relative bg-surface rounded-md p-4 flex flex-col gap-3 overflow-hidden ${className}`}>
      {showMeta && 'verificationStatus' in doctor && (
        <div className={`absolute top-0 left-0 w-8 h-8 rounded-br-full ${doctor?.verificationStatus ? 'bg-primary/80' : 'bg-muted/60'}`}>
          <ShieldCheck className={`${doctor?.verificationStatus ? "text-white" : "text-muted"} pt-1`} />
        </div>
      )}

      <div className="flex items-center gap-4">
        <img
          src={doctor?.profileImage || DEFAULT_IMAGE}
          alt={doctor?.fullName}
          className="w-28 h-28 rounded-md object-cover shadow-md"
        />
        <div className="flex flex-col flex-1">
          <h3 className="text-lg font-semibold text-secondary">Dr. {doctor?.fullName}</h3>
          {('profileStatus' in doctor && doctor?.profileStatus === 'pending')  ? 
          <div className="p-1 px-4 bg-primary-light/30 border border-primary rounded-md text-sm text-primary mt-3 w-fit">Registered only</div> :
           <><p className="text-sm text-primary">{doctor?.specialization} ({doctor?.gender})</p>
            <p className="text-sm text-muted-dark">{doctor?.experience} yrs experience</p>
            <div className="flex items-center gap-2 text-sm text-yellow-600">
              ⭐ {doctor?.rating.average?.toFixed(1) || 'N/A'}
              <span className="text-muted-foreground">({doctor?.rating.reviewCount || 0} reviews)</span>
            </div>
            </>}
        </div>

        {showMeta && "profileStatus" in doctor ? (
          <div className="flex flex-col items-end justify-between h-full">
            <div className="flex items-center gap-2 h-fit">
              <span
                className={`w-2 h-2 rounded-full ${doctor?.profileStatus === 'pending'
                    ? 'bg-muted-dark'
                    : doctor?.profileStatus === 'applied'
                      ? 'bg-yellow-500'
                      : doctor?.profileStatus === 'rejected'
                        ? 'bg-red-600/80'
                        : doctor?.profileStatus === 'approved'
                          ? 'bg-green-700/80'
                          : 'bg-muted-dark'
                  }`}
              ></span>
              <span className="text-muted-dark text-sm capitalize h-fit">
                {doctor?.profileStatus}
              </span>
            </div>

            <div className="flex items-center justify-end w-full gap-2 text-sm mt-2">
              <div
                className={`px-4 py-1 rounded-md text-xs font-medium text-white cursor-default ${doctor?.accountStatus ? 'bg-red-600/80' : 'bg-green-600/80'
                  }`}
              >
                {doctor?.accountStatus ? 'Blocked' : 'Active'}
              </div>
              <div className="px-4 py-1 rounded-md text-xs font-medium text-white bg-primary cursor-pointer" onClick={() => onView(doctor?.id)}>
                View
              </div>
            </div>
          </div>
        ) : (
         !isMe && <SquareArrowOutUpRight className="mb-auto text-secondary hover:text-primary active:scale-95 cursor-pointer" size={15} onClick={() => onView(doctor?.id)} />
        )}
      </div>

      {doctor?.languageSpoken && doctor?.languageSpoken?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {doctor?.languageSpoken.map((lang, idx) => (
            <span
              key={idx}
              className="bg-blue-100 text-primary text-[10px] px-2 py-1 rounded-full"
            >
              {lang}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
