import type { ModalState } from '@/types/modal';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: ModalState = {
  isOpen: false,
  type: 'confirm',
  title: '',
  message: '',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  showCancel: true,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (_state, action: PayloadAction<Omit<ModalState, 'isOpen'>>) => {
      return { ...action.payload, isOpen: true };
    },
    closeModal: () => initialState,
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
