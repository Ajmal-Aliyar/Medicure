import Switch from "@/components/ui/Switch";
import { adminPatientService } from "@/services/api/admin/patient";
import type { IPatient } from "@/types/patient";
import { useState } from "react";

interface Props {
    data: IPatient;
    setPatient: React.Dispatch<React.SetStateAction<IPatient | null>>
}

const PatientStatus = ({ data }: Props) => {
    const [status, setStatus] = useState(data.status)

    const onToggle = async (field: string, value: boolean) => {
        if (value) {
            const res = await adminPatientService.blockPatient(data.id);
            if (res) setStatus((prev) => ({ ...prev, isBlocked: true }));
        } else {
            const res = await adminPatientService.unBlockPatient(data.id);
            if (res) setStatus((prev) => ({ ...prev, isBlocked: false }));
        }
    };

    return (
        <div>
            <h2 className="text-xl text-secondary font-semibold mb-4">Account Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Switch
                    label="Is Blocked"
                    value={status.isBlocked}
                    color="red"
                    onChange={(val) => onToggle?.("isBlocked", val)}
                />
                <p><strong>Created At:</strong> {new Date(data.createdAt).toLocaleString()}</p>
                <p><strong>Updated At:</strong> {new Date(data.updatedAt).toLocaleString()}</p>
            </div>
        </div>
    );
};

export default PatientStatus;
