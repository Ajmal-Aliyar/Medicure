import { Button } from "@/components/ui/Button";
import Switch from "@/components/ui/Switch";
import type { DoctorProfileForAdmin } from "@/types/doctor";
import { Check, X } from "lucide-react";

interface Props {
    data: DoctorProfileForAdmin;
    onToggle?: (field: "isApproved" | "isVerified" | "isBlocked", value: boolean) => void;
}

const DoctorStatus = ({ data }: Props) => {
    const { status, createdAt, updatedAt } = data;

    const onToggle = (field: string, value: boolean) => {
        console.log(field, value)
    }



    return (
        <div>
            <h2 className="text-xl text-secondary font-semibold mb-4">Account Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {status.profileStatus === 'applied' && <div className="md:col-span-2 flex justify-between">
                    <p>Does Doctor complete his profile?</p>
                    <div className="flex  gap-1">
                        <Button variant="red"> <X/> </Button>
                        <Button variant="green"> <Check /> </Button>
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
                <p><strong>Created At:</strong> {new Date(createdAt).toLocaleString()}</p>
                <p><strong>Updated At:</strong> {new Date(updatedAt).toLocaleString()}</p>
            </div>
        </div>
    );
};

export default DoctorStatus;
