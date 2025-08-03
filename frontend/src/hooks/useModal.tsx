import { useDispatch } from 'react-redux';
import type { ModalState } from '@/types/modal';
import { openModal } from '@/slices/modalSlice';


export const useModal = () => {
    const dispatch = useDispatch();

    return (options: Omit<ModalState, "isOpen">) => {
        dispatch(openModal(options));
    };
};

