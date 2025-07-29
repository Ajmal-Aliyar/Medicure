import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDebounce } from "@/hooks/useDebounce";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const MedicineSelector: React.FC<Props> = ({ value, onChange }) => {
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!debouncedQuery) {
        setSuggestions([]);
        return;
      }

      try {
        setLoading(true);
        const res = await axios.get(
          `https://api.fda.gov/drug/label.json?search=openfda.brand_name:${debouncedQuery}*&limit=10`
        );

        const brandNames: string[] = res.data.results.flatMap(
          (item: { openfda: {brand_name: string[]}}) => item.openfda.brand_name || []
        );

        setSuggestions([...new Set(brandNames)]);
      } catch (error) {
        console.log(error);
        
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [debouncedQuery]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (name: string) => {
    onChange(name);
    setQuery(name);
    setOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <input
        type="text"
        value={query}
        onChange={(e) => {
            onChange(e.target.value)
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder="Search medicine..."
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
      />
      {open && (
        <ul className="absolute z-10 bg-white border mt-1 max-h-48 overflow-y-auto w-full rounded shadow">
          {loading && <li className="p-2 text-gray-500">Loading...</li>}
          {!loading &&
            suggestions.map((name, idx) => (
              <li
                key={idx}
                onClick={() => handleSelect(name)}
                className="px-3 py-2 hover:bg-blue-100 cursor-pointer text-sm"
              >
                {name}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};
