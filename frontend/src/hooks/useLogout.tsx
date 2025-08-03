import { useDispatch } from 'react-redux';
import { useModal } from './useModal';
import { authService } from '@/services/api/public/auth';
import { logout } from '@/slices/authSlice';

export const useLogout = () => {
    const dispatch = useDispatch()
    const showModal = useModal();
    const showAlertMessage = () => {
        showModal({
            type: 'warning',
            title: 'Confirm Logout',
            message: 'Are you sure you want to logout?',
            confirmText: 'Logout',
            cancelText: 'Cancel',
            showCancel: true,
            onConfirm: async () => {
                const { success } = await authService.logout()
                if (success) {
                    dispatch(logout());
                }
            },
        });
    }
    
    return showAlertMessage
}

