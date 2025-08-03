import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "@/slices/modalSlice";
import type { RootState } from "@/app/store";

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
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="mb-6 text-sm text-gray-700">{message}</p>

        <div className="flex justify-end gap-4">
          {showCancel && (
            <button
              onClick={handleCancel}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer transition"
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={handleConfirm}
            className={`px-4 py-2 rounded text-white transition ${
              type === "warning"
                ? "bg-red-600/90 hover:bg-red-700/80 cursor-pointer"
                : type === "success"
                ? "bg-green-600 hover:bg-green-700"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GlobalModal;
