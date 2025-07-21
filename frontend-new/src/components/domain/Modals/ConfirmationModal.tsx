import { Button } from "@/components/ui/Button";
import { X } from "lucide-react";

interface ConfirmationModalProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onCancel: () => void;
  onConfirm: () => void;
  confirmLabel: string;
  confirmVariant?: "primary" | "red" | "outline";
}

export const ConfirmationModal = ({
  icon,
  title,
  description,
  onCancel,
  onConfirm,
  confirmLabel,
  confirmVariant = "primary",
}: ConfirmationModalProps) => (
  <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center">
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md text-center relative">
      <button
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 cursor-pointer"
        onClick={onCancel}
      >
        <X size={20} />
      </button>
      <div className="bg-primary p-4 rounded-full inline-block mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-secondary mb-2">{title}</h3>
      <p className="text-sm text-muted mb-6">{description}</p>
      <div className="flex justify-center gap-4">
        <Button variant="outline" onClick={onCancel} className="px-3 py-2">
          Cancel
        </Button>
        <Button variant={confirmVariant} onClick={onConfirm} className="px-3 py-2">
          {confirmLabel}
        </Button>
      </div>
    </div>
  </div>
);
