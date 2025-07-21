import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileTopBody from "./components/ProfileTopBody";
import { patientProfileService } from "@/services/api/patient/profile";
import { setProfileData } from "@/slices/patientSlice";
import type { RootState } from "@/app/store";
import AboutDetails from "./components/AboutDetails";
import AddressSection from "./components/AddressSection";
import { PatientProfileValidation } from "@/validators/patientDataValidator";
import toast from "react-hot-toast";


function PatientProfile() {
    const patient = useSelector((state: RootState) => state.patient)
    const dispatch = useDispatch()

    useEffect(() => {
        const getPatientProfile = async () => {
            const patientDetails = await patientProfileService.getProfile();
            dispatch(setProfileData(patientDetails))
        };
        getPatientProfile();
    }, []);


    const handleAboutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const key = e.target.name
        const val = e.target.value
        dispatch(setProfileData({
            ...patient,
            personal: { ...patient.personal, [key]: val || '' }
        }))
        
    };

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const key = e.target.name
        const val = e.target.value

        dispatch(setProfileData({
            ...patient,
            contact: {
                ...patient.contact,
                address: {
                    ...patient.contact.address,
                    [key]: val || "",
                },
            },
        }));
    };

    const handleSave = async () => {
        const error = PatientProfileValidation(patient);
        if (error) {
            toast.error(error)
            return;
        }
        await patientProfileService.updateProfile(patient)
        toast.success("Profile updated")
    }


    return (
        <div className="w-full h-screen mb-48 flex flex-col ">
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
                    <AboutDetails patientData={patient} handleChange={handleAboutChange} />
                </div>
                <div className="p-4 flex flex-col pb-40">
                    <p className="text-gray-500 font-medium mb-2 text-lg">Address</p>
                    <AddressSection patientData={patient} handleChange={handleAddressChange} />
                </div>
            </div>
        </div>
    );
}

export default PatientProfile;
