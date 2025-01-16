import { updateProfileApi } from "../../../sevices/doctor/profile";
import { IEditProfileSectionProps } from "../../../types/doctor/profileType";
import { useEffect, useState } from "react";

const EditProfileSection: React.FC<IEditProfileSectionProps> = ({ setEditProfile, doctor }) => {
    const [doctorData, setDoctorData] = useState({
        fullName: '',
        headline: '',
        about: '',
        addressLine: '',
        streetAddress: '',
        city: '',
        state: '',
        country: '',
        pincode: '',
    });

    useEffect(() => {
        setDoctorData((prevData) => ({
            ...prevData,
            ...doctor, ...doctor.address
        }));
    },[])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setDoctorData((prevData) => ({
            ...prevData,
            [id]: value
        }));
        console.log(doctorData)
    };

    const handleSave = async () => {
        console.log(doctorData,'adfs')
        await updateProfileApi(doctorData)
    };

    return (
        <div className="w-full h-full relative py-10">
            <div className="px-3 pt-2 pb-1 border-b-2 border-gray-100 flex justify-between h-12 absolute top-0 bg-white w-full rounded-t-md">
                <p className="font-semibold text-lg text-blue-400">Edit Profile</p>
                <button className="font-extralight text-2xl px-3 cursor-pointer" onClick={() => setEditProfile(false)}>x</button>
            </div>

            <div className="h-full w-full overflow-y-auto p-4 flex flex-col gap-3 bg-transparent">

                <div className="text-xl font-medium text-gray-500">Basic Information</div>

                <label htmlFor="fullName" className="text-md font-medium text-gray-400">Full Name*</label>
                <input id="fullName" type="text" value={doctorData.fullName} onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-2 py-1 hover:border-blue-400 bg-transparent" />

                <label htmlFor="headline" className="text-md font-medium text-gray-400">Headline*</label>
                <input id="headline" type="text" value={doctorData.headline} onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-2 py-1 hover:border-blue-400 bg-transparent" />
                <div>

                    <label htmlFor="about" className="text-md font-medium text-gray-400">About*</label>

                    <textarea
                       id="about" value={doctorData.about} onChange={handleChange}
                        className="w-full h-20 border border-gray-300 rounded-md px-2 py-1 hover:border-blue-400 resize-none bg-transparent"
                        rows={5}
                        placeholder="Write about yourself..."
                    />
                </div>



                <div className="text-xl font-medium text-gray-500 mt-5">Address</div>

                {["addressLine", "streetAddress", "city", "state", "country", "pincode"].map((field) => (
                    <div key={field}>
                        <label htmlFor={field} className="text-md font-medium text-gray-400">{field.replace(/([A-Z])/g, ' $1').trim()}*</label>
                        <input
                            id={field}
                            type="text"
                            value={doctorData[field as keyof typeof doctorData]}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-2 py-1 hover:border-blue-400 bg-transparent"
                        />
                    </div>
                ))}

                <div className="mt-10">
                    <div className="text-xl font-medium text-gray-500 flex justify-between">
                        <p>Education</p>
                        <p className="font-extralight text-2xl px-3 cursor-pointer">+</p>

                    </div>
                    <div className="">
                        <div className="flex gap-2 items-center">
                            <div className="w-14 h-14 bg-blue-200"></div>
                            <div>
                                <p className="text-lg font-medium">Degree Bsc Science</p>
                                <p className="text-sm">Harvard University</p>
                                <p className="text-sm"> 2005</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-10">
                    <div className="text-xl font-medium text-gray-500 flex justify-between">
                        <p>Experience</p>
                        <p className="font-extralight text-2xl px-3 cursor-pointer">+</p>

                    </div>
                    <div className="">
                        <div className="flex gap-2 items-center">
                            <div className="w-14 h-14 bg-blue-200"></div>
                            <div>
                                <p className="text-lg font-medium">Degree Bsc Science</p>
                                <p className="text-sm">Harvard University</p>
                                <p className="text-sm"> 2005</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-10">
                    <div className="text-xl font-medium text-gray-500 flex justify-between">
                        <p>Manage Slots</p>
                        <p className="font-extralight text-2xl px-3 cursor-pointer">+</p>

                    </div>
                    <div className="">
                        <div className="flex gap-2 items-center">
                            <div className="w-14 h-14 bg-blue-200"></div>
                            <div>
                                <p className="text-lg font-medium">Degree Bsc Science</p>
                                <p className="text-sm">Harvard University</p>
                                <p className="text-sm"> 2005</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-3 pt-2 pb-1 border-t-2 border-gray-100 bg-white flex justify-end h-12 absolute bottom-0 w-full rounded-b-md">
                <button onClick={handleSave} className="px-4 bg-blue-400 text-white rounded-md active:scale-95">
                    Save
                </button>
            </div>
        </div>
    );
};

export default EditProfileSection;
