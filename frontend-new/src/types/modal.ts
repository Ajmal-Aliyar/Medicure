export interface ModalState {
  isOpen: boolean;
  type: 'confirm' | 'alert' | 'custom' | 'warning' | 'success';
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  showCancel: boolean;
  onConfirm: (() => void) | null;
}
