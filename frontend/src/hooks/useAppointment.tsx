import type { IAppointmentCard } from "@/types/appointment";
import type { MetaType } from "@/types/common";
import { useEffect, useState } from "react";
import { useRole } from "./useRole";
import { patientAppointmentService } from "@/services/api/patient/appointment";
import type { IRole } from "@/types/auth";
import { doctorAppointmentService } from "@/services/api/doctor/appointment";
import { adminAppointmentService } from "@/services/api/admin/appointment";


interface Filters {
    appointmentDate: string;
    appointmentType: string;
    status: string;
    page: number;
}

interface AppointmentService {
  getAllAppointments: (queryParams: URLSearchParams) => Promise<{ data: IAppointmentCard[]; meta: MetaType; }>;
}

const useAppointment = (filters: Filters) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<{ appointments: IAppointmentCard[], meta: MetaType } | null>(null);
    const role = useRole()

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            
            try {
                const queryParams = new URLSearchParams();
                if (filters.appointmentDate) queryParams.append("appointmentDate", filters.appointmentDate.toString());
                if (filters.appointmentType) queryParams.append("appointmentType", filters.appointmentType);
                if (filters.status) queryParams.append("status", filters.status);
                if (filters.page) queryParams.append("page", filters.page.toString());
                
                

                    const services: Record<IRole , AppointmentService> = {
                        patient: patientAppointmentService,
                        doctor: doctorAppointmentService,
                        admin: adminAppointmentService,
                    };
                    
                    if (!services[role]) {
                        throw new Error("Invalid role");
                    }
                    
                    const { data, meta } = await services[role].getAllAppointments(queryParams);
                setData({ appointments: data, meta });
            } catch (err: unknown) {
                console.log(err)
            } finally {
                setLoading(false);
            }
        };

        fetch();
    }, [filters]);

    if (loading) {
        return { data: null, loading, error: null }
    }

    return { data, loading }
}

export default useAppointment