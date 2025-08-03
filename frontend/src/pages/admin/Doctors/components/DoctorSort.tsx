import { FilterBox } from "@/components/ui/FilterBox";
import { SortSelectGroup, type SortOption } from "@/components/ui/SortSelectGroup";

interface DoctorSortProps {
    value: SortOption | null;
    onChange: (value: SortOption | null) => void;
}

export const DoctorSort = ({ value, onChange }: DoctorSortProps) => {
    const onRemove = () => onChange(null);

    const isSorted = () => !!value;

    return (
        <FilterBox
            label="Sort"
            className="pt-3 text-muted-dark"
            onRemove={
                <button
                    onClick={onRemove}
                    className={`text-xs cursor-pointer font-bold ${
                        isSorted() ? "text-primary" : "text-muted hidden"
                    }`}
                >
                    Clear
                </button>
            }
        >
            <div className="flex flex-col gap-3 text-sm p-5">
                <SortSelectGroup
                    fields={["name", "dob", "experience", "rating", "created"]}
                    value={value}
                    onChange={onChange}
                />
            </div>
        </FilterBox>
    );
};
