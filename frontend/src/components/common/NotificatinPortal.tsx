import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store'; // Ensure your RootState is properly typed

const NotificationPortal: React.FC = () => {
    const { error, success, warning, loading } = useSelector(
        (state: RootState) => state.notification
    );

    const renderNotification = () => {
        if (loading) {
            return <div>Loading...</div>;
        }
        if (error) {
            return <div style={{ background: 'red' }}>{error}</div>;
        }
        if (success) {
            return <div style={{ background: 'green' }}>{success}</div>;
        }
        if (warning) {
            return <div style={{ background: 'yellow' }}>{warning}</div>;
        }
        return null;
    };

    return ReactDOM.createPortal(
        <div className="notification-container">{renderNotification()}</div>,
        document.getElementById('notification-root')!
    );
};

export default NotificationPortal;
