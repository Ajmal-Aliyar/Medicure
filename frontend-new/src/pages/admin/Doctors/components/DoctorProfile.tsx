import { DEFAULT_IMAGE } from "@/app/constants";
import type { DoctorProfileForAdmin } from "@/types/doctor";

interface Props {
    data: DoctorProfileForAdmin;
}

const DoctorProfile = ({ data }: Props) => {
    const { profile, location } = data;

    return (
        <div>
            <img src={profile.profileImage || DEFAULT_IMAGE} className="max-w-[10rem] rounded-md mb-4" alt="" />
            <h2 className="text-xl text-secondary font-semibold mb-4">Personal & Contact Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <p className="break-words whitespace-normal"><strong>Full Name:</strong> {profile.fullName}</p>
                <p className="break-words whitespace-normal"><strong>Email:</strong> {profile.email}</p>
                <p className="break-words whitespace-normal"><strong>Mobile:</strong> {profile.mobile}</p>
                <p className="break-words whitespace-normal"><strong>Gender:</strong> {profile.gender}</p>
                <p className="break-words whitespace-normal"><strong>DOB:</strong> {profile.dob}</p>
                <p className="break-words whitespace-normal"><strong>Languages:</strong> {profile.languageSpoken.join(", ")}</p>
                <p className="break-words whitespace-normal"><strong>Street:</strong> {location.street}</p>
                <p className="break-words whitespace-normal"><strong>City:</strong> {location.city}</p>
                <p className="break-words whitespace-normal"><strong>State:</strong> {location.state}</p>
                <p className="break-words whitespace-normal"><strong>Country:</strong> {location.country}</p>
                <p className="break-words whitespace-normal"><strong>Pincode:</strong> {location.pincode}</p>
            </div>
        </div>
    );
};

export default DoctorProfile;
