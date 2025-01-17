import React from 'react';
import { useDispatch } from 'react-redux';
import {
    setError,
    clearError,
    setSuccess,
    clearSuccess,
    setWarning,
    clearWarning,
    setLoading,
} from '../../store/slices/commonSlices/notificationSlice'; 

const TestNotificationPage: React.FC = () => {
    const dispatch = useDispatch();

    const handleSetError = () => {
        dispatch(setError('This is an error message!'));
    };

    const handleClearError = () => {
        dispatch(clearError());
    };

    const handleSetSuccess = () => {
        dispatch(setSuccess('This is a success message!'));
    };

    const handleClearSuccess = () => {
        dispatch(clearSuccess());
    };

    const handleSetWarning = () => {
        dispatch(setWarning('This is a warning message!'));
    };

    const handleClearWarning = () => {
        dispatch(clearWarning());
    };

    const handleSetLoading = () => {
        dispatch(setLoading(true));
    };

    const handleClearLoading = () => {
        dispatch(setLoading(false));
    };

    return (
        <div>
            <h1>Test Notification Page</h1>
            <button onClick={handleSetError}>Set Error</button>
            <button onClick={handleClearError}>Clear Error</button>
            <button onClick={handleSetSuccess}>Set Success</button>
            <button onClick={handleClearSuccess}>Clear Success</button>
            <button onClick={handleSetWarning}>Set Warning</button>
            <button onClick={handleClearWarning}>Clear Warning</button>
            <button onClick={handleSetLoading}>Set Loading</button>
            <button onClick={handleClearLoading}>Clear Loading</button>
        </div>
    );
};

export default TestNotificationPage;
