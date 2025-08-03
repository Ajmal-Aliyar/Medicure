import { Input } from "@/components/domain/Cards/Input";
import { MedicineSelector } from "@/components/domain/Selector/MedicineSelector";
import { Textarea } from "@/components/ui/Textarea";
import type { IMedication } from "@/types/prescription";

interface MedicationInputProps {
    medication: IMedication;
    index: number;
    onChange: (index: number, updated: IMedication) => void;
    onRemove: (index: number) => void;
    isDoctor: boolean;
}

export const MedicationInput: React.FC<MedicationInputProps> = ({
    medication,
    index,
    onChange,
    onRemove,
    isDoctor
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!isDoctor) return
        const { name, value } = e.target;
        onChange(index, { ...medication, [name]: value });
    };

    return (
        <div className="border p-3 rounded mt-2">
            <div className="flex justify-between items-center mb-2">
                <strong>Medication {index + 1}</strong>
                {isDoctor && <button type="button" onClick={() => onRemove(index)} className="text-red-500 cursor-pointer">
                    Remove
                </button>}
            </div>
            <div className="grid grid-cols-2 gap-2">
                {isDoctor ? <div className={` space-y-1`}>
                    <label className="text-sm font-medium">Medicine Name</label>
                    <MedicineSelector value={medication.medicineName} onChange={(val) => onChange(index, { ...medication, medicineName: val })} />
                </div> :
                    <Input label="Medicine Name" name="medicineName" value={medication.medicineName} />}
                <Input label="Dosage" name="dosage" value={medication.dosage} onChange={handleChange} />
                <Input label="Frequency" name="frequency" value={medication.frequency} onChange={handleChange} />
                <Input label="Duration" name="duration" value={medication.duration} onChange={handleChange} />
                <Textarea className="col-span-2" label="Instructions" name="instructions" value={medication.instructions} onChange={handleChange} />
                <Input label="Quantity" name="quantity" type="number" value={medication.quantity.toString()} onChange={handleChange} />
                <Input label="Refills" name="refills" type="number" value={medication.refills.toString()} onChange={handleChange} />
            </div>
        </div>
    );
};
