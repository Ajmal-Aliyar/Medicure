import AboutDetails from "../../components/patient/profile/AboutDetails";
import AddressSection from "../../components/patient/profile/AddressSection";
import OtherDetails from "../../components/patient/profile/OtherDetails";
import ProfileTopBody from "../../components/patient/profile/ProfileTopBody";

function Profile() {
    return (
        <div className="w-screen h-screen flex justify-center items-center p-6 bg-[#eeeeee] ">
            <div className="w-full md:w-4/5 lg:w-3/4 h-[90%] mt-16 rounded-md bg-[#f9f9f9] shadow-lg flex flex-col">
                <div className="border-b-2 p-4 text-lg font-medium text-blue-400 flex justify-between shadow-md ">
                    <p>Account Settings</p>
                    <button className="text-white bg-blue-300 px-4 py-1 rounded-md hover:bg-blue-400 active:scale-95 transition-all">
                        Save Changes
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto pb-10">
                    <div className="p-4 border-b-2">
                        <ProfileTopBody />
                    </div>
                    <div className="p-4 flex flex-col">
                        <p className="text-gray-500 font-medium mb-2 text-lg">About Details</p>
                        <AboutDetails />
                    </div>
                    <div className="p-4 flex flex-col">
                        <p className="text-gray-500 font-medium mb-2 text-lg">Address</p>
                        <AddressSection />
                    </div>
                    <div className="p-4 flex flex-col">
                        <p className="text-gray-500 font-medium mb-2 text-lg ">Other Details</p>
                        <OtherDetails />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
