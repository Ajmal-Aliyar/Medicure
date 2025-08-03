const specializations = [
    "Dentist",
    "Anesthesiology",
    "Allergy and Immunology",
    "Cardiology",
    "Dermatology",
    "Emergency Medicine",
    "Family Medicine",
    "Internal Medicine",
    "Neurology",
    "Pediatrics",
    "Psychiatry",
];

type Props = {
    selected: string | null;
    setSelected: (spec: string) => void;
    className?: string,
};
export const SpecializationSelector = ({ selected, setSelected, className = '' }: Props) => {
    return (
        <div className={`flex flex-col ${className}`}>
            <label htmlFor="specialization" className="text-sm mb-1 text-gray-600">
                Specialization
            </label>
            <select
                id="specialization"
                value={selected ?? ""}
                onChange={(e) => setSelected(e.target.value)}
                className="border p-2 rounded-md bg-white outline-none border-primary-light text-gray-800"
            >
                <option value="" disabled>
                    Select a specialization
                </option>
                {specializations.map((spec) => (
                    <option key={spec} value={spec}>
                        {spec}
                    </option>
                ))}
            </select>
        </div>
    );
};


