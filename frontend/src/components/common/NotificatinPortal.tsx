import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store'; 
import HoneyComb from './HoneyComb';
import ErrorMessage from './ErrorMessage';
import { clearError, clearSuccess, clearWarning } from '../../store/slices/commonSlices/notificationSlice';
import SuccessModal from './SuccessMessage';
import WarningMessage from './WarningMessage';

const NotificationPortal: React.FC = () => {
    const { error, success, warning, loading } = useSelector(
        (state: RootState) => state.notification
    );
    const dispatch = useDispatch()

    const handleError = () => {
        dispatch(clearError())
    }

    const handleSuccess = () => {
        dispatch(clearSuccess())
    }

    const handleWarning = () => {
        dispatch(clearWarning())
    }



    const renderNotification = () => {
        if (loading) {
            return <div className='w-screen h-screen bg-[#f4f4f4a9] fixed top-0 flex justify-center items-center z-50'><HoneyComb /></div>;
        }
        if (error) {
            return <div className='w-screen h-screen bg-gradient-to-t from-[#00000070]  fixed top-0 z-50 flex flex-col items-center'><ErrorMessage message={error} handleModal={handleError}/></div>;
        }
        if (success) {
            return <div className='w-screen h-screen bg-gradient-to-t from-[#21212156] to-[#0000003b] fixed top-0 z-50 flex flex-col items-center'><SuccessModal message={success} handleModal={handleSuccess}/></div>
        }
        if (warning) {
            return <div className='w-screen h-screen bg-gradient-to-t from-[#00000070] fixed top-0 z-50 flex flex-col items-center'><WarningMessage message={warning} handleModal={handleWarning}/></div>
        }
        return null;
    };

    return ReactDOM.createPortal(
        <div className="notification-container">{renderNotification()}</div>,
        document.getElementById('notification-root')!
    );
};

export default NotificationPortal;
