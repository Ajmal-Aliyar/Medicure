
import type { IMedication } from "@/types/prescription";
import { Button } from "@/components/ui/Button";
import { X } from "lucide-react";
import { Input } from "@/components/domain/Cards/Input";
import { Textarea } from "@/components/ui/Textarea";
import usePrescription from "@/hooks/usePrescription";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import { MedicationInput } from "@/pages/consultation/components/MedicationInput";
import { setPrescription } from "@/slices/globalSlice";
import type { IRole } from "@/types/auth";
import { useNavigate } from "react-router-dom";

interface Props {
    prescriptionId: string | null;
}

export const PrescriptionModal = ({ prescriptionId }: Props) => {
    const { user } = useSelector((state: RootState) => state.auth)
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const { patientId, doctorId, appointmentId } = useSelector((state: RootState) => state.consultation)
    const { onUpdate, prescriptionDetails: formData, setPrescriptionDetails: setFormData } = usePrescription({ prescriptionId, doctorId: doctorId as string, patientId: patientId as string, appointmentId: appointmentId as string, role: user?.role as IRole })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (user?.role !== 'doctor') return
        const { name, value, type, checked } = e.target as { checked: boolean, type: string, value: string, name: string };
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData) return null
        onUpdate(formData);
    };

    const handleMedicationChange = (index: number, updated: IMedication) => {
        setFormData(prev => {
            const updatedMeds = [...prev.medications];
            updatedMeds[index] = updated;
            return {
                ...prev, medications: updatedMeds.map((med) => {
                    return { ...med, refills: Number(med.refills), quantity: Number(med.quantity) }
                })
            };
        });
    };

    const handleAddMedication = () => {
        setFormData(prev => ({
            ...prev,
            medications: [
                ...prev.medications,
                {
                    medicineId: "",
                    medicineName: "",
                    dosage: "",
                    frequency: "",
                    duration: "",
                    instructions: "",
                    quantity: 1,
                    refills: 0,
                },
            ],
        }));
    };

    const handleRemoveMedication = (index: number) => {
        setFormData(prev => ({
            ...prev,
            medications: prev.medications.filter((_, i) => i !== index),
        }));
    };
    return (
        <div className="p-4 fixed right-0 top-0  flex flex-col h-full">
            <form className="lg:min-w-3xl w-full h-full flex flex-col bg-background rounded-md text-secondary " onSubmit={handleSubmit}>
                <div className="sticky p-4 top-0 border-b border-border shadow flex items-center">
                    <p>Prescription</p>
                    {user?.role === 'doctor' && <Button className="ml-auto py-1 px-2">Update</Button>}
                </div>
                <div className="bg-background rounded-full p-1 h-fit w-fit cursor-pointer absolute top-3 -left-10"
                    onClick={() => dispatch(setPrescription({ prescriptionId: null, isOpen: false }))}>
                    <X className="text-secondary" />
                </div>
                <div className="p-4 space-y-3 flex flex-col overflow-auto">
                    <Textarea
                        label="Diagnosis (comma-separated)"
                        name="diagnosis"
                        value={formData?.diagnosis}
                        onChange={handleChange}
                    />
                    <Textarea
                        label="Symptoms (comma-separated)"
                        name="symptoms"
                        value={formData?.symptoms}
                        onChange={handleChange}
                    />
                    <Textarea
                        label="Notes"
                        name="notes"
                        value={formData?.notes}
                        onChange={handleChange}
                    />
                    <div>
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-medium">Medications</label>
                            {user?.role === 'doctor' && <Button variant="secondary" onClick={(e) => {
                                e.preventDefault()
                                handleAddMedication()
                            }
                            } className="py-1 px-2">
                                + Add Medication
                            </Button>}
                        </div>
                        {formData.medications.map((med, index) => (
                            <MedicationInput
                                key={index}
                                index={index}
                                medication={med}
                                onChange={handleMedicationChange}
                                onRemove={handleRemoveMedication}
                                isDoctor={user?.role === 'doctor'}
                            />
                        ))}
                    </div>
                    <div className="flex gap-4">
                        <Input
                            label="Issued Date"
                            type="date"
                            name="issuedDate"
                            value={formData?.issuedDate}
                            onChange={handleChange}
                        />
                        <Input
                            label="Valid Until"
                            type="date"
                            name="validUntil"
                            value={formData?.validUntil}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="followUpRequired"
                            checked={formData?.followUpRequired}
                            onChange={handleChange}
                            className="h-4 w-4"
                        />
                        <label htmlFor="followUpRequired">Follow-up Required</label>
                    </div>

                    {formData?.followUpRequired && (
                        <Input
                            label="Follow-up Date"
                            type="date"
                            name="followUpDate"
                            value={formData?.followUpDate}
                            onChange={handleChange}
                        />
                    )}

                    <Textarea
                        label="Allergies (comma-separated)"
                        name="allergies"
                        value={formData?.allergies}
                        onChange={handleChange}
                    />
                    <div className="p-4 ml-auto ">
                        <div className="flex gap-4">
                            <Button variant="green" onClick={(e) => {
                                e.preventDefault()
                                navigate(`/view/prescription/${prescriptionId}`)
                                }} className=" px-4 py-2 rounded">
                                Download
                            </Button>
                        </div>
                    </div>
                </div>
            </form>

        </div>
    );
};

