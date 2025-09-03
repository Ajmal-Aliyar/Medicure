export interface ModalState {
  isOpen: boolean;
  type: "primary" | "secondary" | "muted" | "red" | "green" | "outline";
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  showCancel: boolean;
  onConfirm: (() => void) | null;
}
