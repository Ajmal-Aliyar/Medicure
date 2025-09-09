import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "@/slices/modalSlice";
import type { RootState } from "@/app/store";
import { Button } from "../ui/Button";

const GlobalModal = () => {
  const modal = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();

  if (!modal.isOpen) return null;

  const {
    type,
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    showCancel = true,
    onConfirm,
  } = modal;

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    dispatch(closeModal());
  };

  const handleCancel = () => {
    dispatch(closeModal());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-[90%] max-w-md">
        <h2 className="text-xl font-semibold mb-2 text-secondary">{title}</h2>
        <p className="mb-6 text-sm text-gray-700">{message}</p>

        <div className="flex justify-end gap-4">
          {showCancel && <Button variant={"muted"} onClick={handleCancel}
              className="px-4 rounded cursor-pointer transition"
            >{cancelText}</Button>}
          <Button variant={type} onClick={handleConfirm} className={`px-4  rounded text-white transition`}>{confirmText}</Button>
        </div>
      </div>
    </div>
  );
};

export default GlobalModal;
