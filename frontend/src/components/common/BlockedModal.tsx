import { useDispatch } from "react-redux";
import { logOutUser } from "../../store/slices/commonSlices/AuthSlice";
import { useEffect } from "react";
import { AppDispatch } from "../../store/store";

const BlockedModal = () => {
    const dispatch = useDispatch<AppDispatch>()
    const handleLogout = () => {
        dispatch(logOutUser());
        };

        useEffect(() => {
            handleLogout()
        },[])
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-xl font-semibold mb-4 text-red-600">Access Denied</h2>
                <p>Your account has been blocked.</p>
            </div>
        </div>
    );
};

export default BlockedModal;
