
import type { RootState } from "@/app/store";
import { showError } from "@/lib/toast";
import { doctorService } from "@/services/api/doctor/doctor";
import { setLoading } from "@/slices/globalSlice";
import type { IDoctorData } from "@/types/doctor";
import { validateDoctorData } from "@/validators";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";


export const AddProfile: React.FC<{ setEditProfile: Dispatch<SetStateAction<string>> }> = ({ setEditProfile }) => {
    const {doctor} = useSelector((state: RootState) => state.doctor)
    
    const dispatch = useDispatch()

    const [doctorData, setDoctorData] = useState<IDoctorData>({
        fullName: '',
        headline: '',
        about: '',
        dob: '',
        gender: '',
        mobile: '',
        street: '',
        specialization: '',
        languageSpoken: [],
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
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        if (id === 'languageSpoken') {
            setDoctorData((prevData) => ({
                ...prevData,
                [id]: value.split(',')
            }));
        } else {
            setDoctorData((prevData) => ({
                ...prevData,
                [id]: value
            }));
        }

    };

    const handleSave = async () => {
        dispatch(setLoading(true));
        const errors = validateDoctorData(doctorData);
        if (errors.length > 0) {
            showError(`${errors.join("\n")}`)
            return;
        }

        try {
            await doctorService.updateProfile(doctorData);
            setEditProfile('');
            window.location.reload();
        } catch (error) {
            console.error("Error updating profile:", error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div className="w-full h-full relative py-10">
            <div className="px-3 pt-2 pb-1 border-b-2 border-gray-100 flex justify-between h-12 absolute top-0 bg-white w-full rounded-t-md">
                <p className="font-semibold text-lg text-blue-400">Edit Profile</p>
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
                <label htmlFor="mobile" className="text-md font-medium text-gray-400">Mobile*</label>
                <input id="mobile" type="text" value={doctorData.mobile} onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-2 py-1 hover:border-blue-400 bg-transparent" />

                <label htmlFor="dob" className="text-md font-medium text-gray-400">Date Of Birth*</label>
                <input id="dob" type="text" value={doctorData.dob} onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-2 py-1 hover:border-blue-400 bg-transparent" />

                <label htmlFor="gender" className="text-md font-medium text-gray-400">Gender*</label>
                <input id="gender" type="text" value={doctorData.gender} onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-2 py-1 hover:border-blue-400 bg-transparent" />
                <label htmlFor="specialization" className="text-md font-medium text-gray-400">specialization*</label>
                <input id="specialization" type="text" value={doctorData.specialization} onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-2 py-1 hover:border-blue-400 bg-transparent" />
                <label htmlFor="languageSpoken" className="text-md font-medium text-gray-400">Spoken language*</label>
                <input id="languageSpoken" type="text" value={doctorData.languageSpoken.join(', ')} onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-2 py-1 hover:border-blue-400 bg-transparent" />






                <div className="text-xl font-medium text-gray-500 mt-5">Address</div>

                {[ "street", "city", "state", "country", "pincode"].map((field) => (
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

                <div className="mb-4"></div>
            </div>

            <div className="px-3 pt-2 pb-1 border-t-2 border-gray-100 bg-white flex justify-end h-12 absolute bottom-0 w-full rounded-b-md">
                <button onClick={handleSave} className="px-4 bg-blue-400 text-white rounded-md active:scale-95">
                    Save
                </button>
            </div>
        </div>
    );
};


