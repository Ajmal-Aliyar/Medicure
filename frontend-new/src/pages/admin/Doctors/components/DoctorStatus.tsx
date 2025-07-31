import { Button } from "@/components/ui/Button";
import Switch from "@/components/ui/Switch";
import { adminDoctorService } from "@/services/api/admin/doctor";
import type { DoctorProfileForAdmin } from "@/types/doctor";
import { Check, X } from "lucide-react";
import { useState } from "react";

interface Props {
    data: DoctorProfileForAdmin;
    setDoctor: React.Dispatch<React.SetStateAction<DoctorProfileForAdmin | null>>
}

const DoctorStatus = ({ data, setDoctor }: Props) => {
    const [newStatus, setNewStatus] = useState<"approve" | "reject" | null>(null)
    const [status, setStatus] = useState(data.status)
    const [comment, setComment] = useState<string>('')
    const onToggle = async (field: string, value: boolean) => {
        if (value) {
            const res = await adminDoctorService.blockDoctor(data.id);
            if (res) setStatus((prev) => ({ ...prev, isBlocked: true }));
        } else {
            const res = await adminDoctorService.unBlockDoctor(data.id);
            if (res) setStatus((prev) => ({ ...prev, isBlocked: false }));
        }
    };



    const handleDoctorStatus = async (newStatus: "approved" | "rejected") => {
        const res = await adminDoctorService.updateDoctorStatus(data.id, newStatus, comment)
        if (res) setStatus((prev) => ({ ...prev, profileStatus: newStatus }))
        setNewStatus(null)
    }

    return (
        <div>
            {newStatus && (
                <div className="fixed top-0 left-0 right-0 bottom-0 z-10 bg-black/30 flex items-center justify-center">
                    <div className="bg-white max-w-[500px] w-full rounded-md shadow-lg p-6 space-y-4">
                        <h2 className="text-lg font-semibold text-secondary">
                            {`Are you sure you want to ${newStatus} this doctor?`}
                        </h2>

                        <textarea
                            className="w-full h-24 border border-gray-300 rounded-md p-2 resize-none focus:outline-none focus:ring-2 focus:ring-primary-light"
                            placeholder="Enter a comment (optional)"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />

                        <div className="flex justify-end gap-4">
                            <Button variant="muted"
                                className="px-2 py-1 "
                                onClick={() => setNewStatus(null)}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant={newStatus === 'approve' ? "green" : 'red'}
                                className="px-2 py-1  "
                                onClick={() => handleDoctorStatus(newStatus === 'approve' ? "approved" : 'rejected')}
                            >
                                {newStatus}
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            <h2 className="text-xl text-secondary font-semibold mb-4">Account Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {status.profileStatus === 'applied' && <div className="md:col-span-2 flex justify-between">
                    <p>Does Doctor complete his profile?</p>
                    <div className="flex  gap-1">
                        <Button variant="red" onClick={() => setNewStatus('reject')}> <X /> </Button>
                        <Button variant="green" onClick={() => setNewStatus('approve')}> <Check /> </Button>
                    </div>
                </div>}
                <Switch
                    label="Is Verified"
                    value={status.isVerified}
                    color="blue"
                    onChange={(val) => onToggle?.("isVerified", val)}
                />
                <Switch
                    label="Is Blocked"
                    value={status.isBlocked}
                    color="red"
                    onChange={(val) => onToggle?.("isBlocked", val)}
                />
                <p><strong>Profile Status:</strong> {status.profileStatus}</p>
                <p><strong>Created At:</strong> {new Date(data.createdAt).toLocaleString()}</p>
                <p><strong>Updated At:</strong> {new Date(data.updatedAt).toLocaleString()}</p>
            </div>
        </div>
    );
};

export default DoctorStatus;
