import { ArrowDown01, ArrowUp10 } from "lucide-react";
import { Button } from "./Button";

export interface SortOption {
  field: string;
  order: "asc" | "desc";
}

interface Props {
  fields: string[];
  value: SortOption | null;
  onChange: (value: SortOption | null) => void;
  className?: string;
}

export const SortSelectGroup = ({
  fields,
  value,
  onChange,
  className = "",
}: Props) => {
  const handleToggleField = (field: string) => {
    if (value?.field === field) {
      onChange(null); 
    } else {
      onChange({ field, order: "asc" });
    }
  };

  const handleOrderChange = (order: "asc" | "desc") => {
    if (value) {
      onChange({ ...value, order });
    }
  };

  return (
    <div className={`flex flex-wrap gap-4 ${className}`}>
      {fields.map((field) => {
        const isActive = value?.field === field;
        return (
          <div key={field} className="flex items-start md:items-center justify-between gap-4">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={isActive}
                onChange={() => handleToggleField(field)}
              />
              <span className="capitalize">{field}</span>
            </label>

            {isActive && (
              <div className="flex gap-2">
                <Button
                  variant={value?.order === "asc" ? "primary" : "muted"}
                  className="py-1 px-2 flex gap-1 items-center text-xs"
                  onClick={() => handleOrderChange("asc")}
                >
                  <ArrowUp10 size={16} />
                  Asc
                </Button>
                <Button
                  variant={value?.order === "desc" ? "primary" : "muted"}
                  className="py-1 px-2 flex gap-1 items-center text-xs"
                  onClick={() => handleOrderChange("desc")}
                >
                  <ArrowDown01 size={16} />
                  Desc
                </Button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
