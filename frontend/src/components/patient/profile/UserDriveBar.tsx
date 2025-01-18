import React from 'react'
import { useDispatch } from 'react-redux';
import { clearWarning, setExtra, setWarning } from '../../../store/slices/commonSlices/notificationSlice';
import { logOutUser } from '../../../store/slices/authSlices/AuthSlice';
import { AppDispatch } from '../../../store/store';

function UserDriveBar() {
    const dispatch = useDispatch<AppDispatch>()
    const handleLogout = () => {
            dispatch(setWarning("Are you sure you want to log out?"))
            dispatch(setExtra(() => {
                dispatch(clearWarning())
                dispatch(logOutUser())
            }));
        };
    return (
        <>
            <p className="cursor-pointer my-2 hover:lg:scale-105 duration-300">Appointments</p>
            <p className="cursor-pointer my-2 hover:lg:scale-105 duration-300">Medical records</p>
            <p className="cursor-pointer my-2 hover:lg:scale-105 duration-300">Payments</p>
            <p className="cursor-pointer my-2 hover:lg:scale-105 duration-300">Feedback</p>
            <p className="cursor-pointer my-2 hover:lg:scale-105 duration-300" onClick={handleLogout}>Logout</p>
        </>
    )
}

export default UserDriveBar
