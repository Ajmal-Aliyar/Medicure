import type { MetaType } from "@/types/common";
import { useEffect, useState } from "react";
import { useRole } from "./useRole";
import type { IRole } from "@/types/auth";
import type { ISlotDetails } from "@/types/slot";
import { doctorSlotService } from "@/services/api/doctor/slot";
import { adminSlotService } from "@/services/api/admin/slot";


interface Filters {
    doctorId?: string;
    patientId?: string;
    type?: string;
    isBooked: boolean | null;
    isActive?: boolean | null;
    status?: string;
    date?: string;
    page?: number;
}

interface SlotService {
    getAllSlots: (queryParams: URLSearchParams) => Promise<{ data: ISlotDetails[]; meta: MetaType; }>;
}

const useSlot = (filters: Filters) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<{ slots: ISlotDetails[], meta: MetaType } | null>(null);
    const role = useRole()

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);

            try {
                const queryParams = new URLSearchParams();
                if (filters.doctorId) queryParams.append("doctorId", filters.doctorId);
                if (filters.patientId) queryParams.append("patientId", filters.patientId);
                if (filters.type) queryParams.append("type", filters.type);
                if (filters.isBooked !== null) queryParams.append("isBooked", filters.isBooked.toString());
                if (filters.isActive && filters.isActive !== null) queryParams.append("isActive", filters.isActive.toString());
                if (filters.status) queryParams.append("status", filters.status);
                if (filters.date) queryParams.append("date", filters.date);
                if (filters.page) queryParams.append("page", filters.page.toString());



                const services: Record<IRole, SlotService> = {
                    patient: adminSlotService,
                    doctor: doctorSlotService,
                    admin: adminSlotService,
                };

                if (!services[role]) {
                    throw new Error("Invalid role");
                }

                const { data, meta } = await services[role].getAllSlots(queryParams);
                setData({ slots: data, meta });
            } catch (err: unknown) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetch();
    }, [filters]);

    if (loading) {
        return { data: null, loading }
    }

    const updateSlotStatus = async (slotId: string, isActive: boolean) => {
        const updatedSlot = await doctorSlotService.updateSlotStatus(slotId, isActive);
        setData((prevData) => {
            if (!prevData) return null;
            const updatedSlots = prevData.slots.map((slot) =>
                slot.id === updatedSlot.id ? updatedSlot : slot
            );
            return {
                slots: updatedSlots,
                meta: prevData.meta,
            };
        });
    };
    return { data, loading, updateSlotStatus }
}

export default useSlot