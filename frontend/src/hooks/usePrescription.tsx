import { doctorPrescriptionService } from "@/services/api/doctor/prescription";
import { patientPrescriptionService } from "@/services/api/patient/prescription";
import type { IRole } from "@/types/auth";
import type { IFormPrescription, IPrescriptionService } from "@/types/prescription";
import { addDays, format } from "date-fns";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Props {
    prescriptionId: string | null;
    doctorId: string;
    patientId: string;
    appointmentId: string;
    setIsPrescription?: (state: boolean) => void;
    role: IRole
}
const usePrescription = ({ prescriptionId, doctorId, patientId, appointmentId, setIsPrescription, role }: Props) => {
    const [prescriptionUpdated, setPrescriptionUpdated] = useState<boolean>(false);

    const [prescriptionDetails, setPrescriptionDetails] = useState<IFormPrescription>({
        diagnosis: '',
        symptoms: '',
        notes: '',
        issuedDate: format(new Date(), 'yyyy-MM-dd'),
        validUntil: format(addDays(new Date(), 7), 'yyyy-MM-dd'),
        followUpRequired: false,
        followUpDate: '',
        allergies: '',
        medications: []
    });

    useEffect(() => {
        const fetchPrescriptionDetails = async (prescriptionId: string) => {
            if (role === 'admin') return
            const services: Record<'patient' | 'doctor', IPrescriptionService > = {
                patient: patientPrescriptionService,
                doctor: doctorPrescriptionService,
            };
            if (!services[role]) {
                throw new Error("Invalid role");
            }
            const prescription = await services[role].getPrescriptionDetails(prescriptionId)


            setPrescriptionDetails({
                ...prescription,
                followUpDate: prescription.followUpDate ? format(prescription.followUpDate, 'yyyy-MM-dd') : '',
                issuedDate: format(prescription.issuedDate, 'yyyy-MM-dd'),
                validUntil: format(prescription.validUntil, 'yyyy-MM-dd'),
                diagnosis: prescription.diagnosis.join(', '),
                symptoms: prescription.symptoms.join(', '),
                allergies: prescription.allergies.join(', '),
            })
        }

        if (prescriptionId) fetchPrescriptionDetails(prescriptionId)
    }, [prescriptionId])

    const onUpdate = async (data: IFormPrescription) => {
        const response = await doctorPrescriptionService.createOrUpdatePrescription({
            ...data,
            doctorId, patientId, appointmentId,
            validUntil: new Date(data.validUntil),
            issuedDate: new Date(data.issuedDate),
            followUpDate: data.followUpDate ? new Date(data.followUpDate) : null,
            allergies: data.allergies.split(',').map((a) => a.trim()),
            symptoms: data.symptoms.split(',').map((s) => s.trim()),
            diagnosis: data.diagnosis.split(',').map((d) => d.trim()),
        })
        if (response) {
            toast.success("Prescription updated successfully.")
            setPrescriptionUpdated(true)
             if (setIsPrescription) setIsPrescription(false)
        }
    }


    return {
        prescriptionDetails, setPrescriptionDetails,
        prescriptionUpdated, onUpdate
    }
}

export default usePrescription