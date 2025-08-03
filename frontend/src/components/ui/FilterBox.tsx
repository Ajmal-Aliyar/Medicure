import { ChevronDown, ChevronUp } from "lucide-react";
import { useState, type ReactNode } from "react";

interface FilterBoxProps {
    label?: string;
    children: ReactNode;
    className?: string;
    onRemove?: ReactNode;
}

export const FilterBox = ({ label, children, className = "", onRemove }: FilterBoxProps) => {
    const [filterDropdown, setFilterDropdown] = useState<boolean>(false)

    return (
        <>
            <div className={`w-full flex justify-between relative ${className}`}>
                <div className="flex cursor-pointer"  onClick={() => setFilterDropdown(p => !p)}>
                {filterDropdown ? <ChevronUp  className="pt-1"  /> :
                    <ChevronDown className="cursor-pointer pt-1"/>}
                    {label && <h4 className="font-">{label}</h4>}
                </div>
                {onRemove}
            </div>
            <div className={`${filterDropdown ? 'max-h-[500px]' : 'max-h-[0rem]'} w-full transition-all duration-300 overflow-hidden`}>
                {children}
            </div>
        </>
    );
};
