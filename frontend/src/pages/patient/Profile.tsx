import { useEffect, useState } from "react";
import AboutDetails from "../../components/patient/profile/AboutDetails";
import AddressSection from "../../components/patient/profile/AddressSection";
import ProfileTopBody from "../../components/patient/profile/ProfileTopBody";
import { getPatientProfileData, updatePatientProfileData } from "../../sevices/patient/profile";
import { useDispatch } from "react-redux";
import { setError, setSuccess } from "../../store/slices/commonSlices/notificationSlice";
import { useNavigate } from "react-router-dom";
import { PatientProfileValidation } from "../../utils/validate/validationPatientProfileUpdate";
import { IPatientProfile, IPatientProfilePayload } from "../../types/patient/profileType";
import { setPatientProfileData } from "../../store/slices/patientSlices/profileSlice";

function Profile() {
    const [patientData, setProfileData] = useState<IPatientProfilePayload>({
        profileImage: '',
        fullName: '',
        phone: '',
        email: '',
        dob: '',
        bloodGroup: '',
        gender: '',
        houseName: '',
        street: '',
        city: '',
        state: '',
        country: '',
        pincode: '',

    })
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const getPatientProfile = async () => {
            try {
                const response = await getPatientProfileData() as { patientData: IPatientProfile };
                console.log(response.patientData,'patient')
                const { profileImage, fullName, phone, email, dob, gender, bloodGroup, address}: IPatientProfile = response.patientData;

                setProfileData({
                    profileImage,
                    fullName,
                    phone,
                    email,
                    dob,
                    gender,
                    bloodGroup,
                    ...address, 
                });
                dispatch(setPatientProfileData({
                    profileImage,
                    fullName,
                    phone,
                    email,
                    dob,
                    gender,
                    bloodGroup,
                    ...address, 
                }))
            } catch (error: any) {
                dispatch(setError(error.message));
                navigate('/user');
            }
        };
        getPatientProfile();
    }, []);
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const key = e.target.name
        const val = e.target.value
        console.log(key, val, 'kv')
        setProfileData((prev) => ({
            ...prev,
            [key]: val || '',
        }));
    };

    const handleSave = async () => {
        const error = PatientProfileValidation(patientData);
        if (error) {
            dispatch(setError(error))
            return;
        }
        const response = await updatePatientProfileData(patientData)
        if (response?.data) {
            dispatch(setSuccess(response.data.message));
        }
    }


    return (
        <div className="w-screen h-screen flex justify-center items-center md:p-6 bg-[#eeeeee] ">
            <div className="w-full md:w-4/5 lg:w-3/4 h-[90%] mt-16 rounded-md bg-[#f9f9f9] shadow-lg flex flex-col">
                <div className="border-b-2 p-4 text-lg font-medium text-[#0c0b3eb5] flex justify-between shadow-md ">
                    <p>Account Settings</p>
                    <button className="text-white bg-[#0c0b3e80] hover:bg-[#0c0b3eb5] px-4 py-1 rounded-md active:scale-95 transition-all" onClick={handleSave}>
                        Save Changes
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto pb-10">
                    <div className="p-4 border-b-2">
                        <ProfileTopBody />
                    </div>
                    <div className="p-4 flex flex-col">
                        <p className="text-gray-500 font-medium mb-2 text-lg">About Details</p>
                        <AboutDetails patientData={patientData} handleChange={handleChange} />
                    </div>
                    <div className="p-4 flex flex-col">
                        <p className="text-gray-500 font-medium mb-2 text-lg">Address</p>
                        <AddressSection patientData={patientData} handleChange={handleChange} />
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default Profile;
