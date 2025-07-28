
import ISO6391 from "iso-639-1";

interface Props {
  value: string[];
  onChange: (value: string[]) => void;
  label?: string;
  className?: string;
  onlyPopular?: boolean;
}

const LanguageSelect = ({
  value,
  onChange,
  label,
  className = "",
  onlyPopular = false,
}: Props) => {
  const popularLangs = ['en', 'hi', 'fr', 'es', 'ar'];

  const languageOptions = (onlyPopular ? popularLangs : ISO6391.getAllCodes())
    .map((code) => ({
      code,
      name: ISO6391.getNativeName(code) || ISO6391.getName(code),
    }))
    .filter((lang) => lang.name);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    if (selected && !value.includes(selected)) {
      onChange([...value, selected]);
    }
  };

  const handleRemove = (lang: string) => {
    onChange(value.filter((v) => v !== lang));
  };

  return (
    <div className={`flex flex-col ${className}`}>
      {label && <label className="text-sm mb-1 text-gray-600">{label}</label>}
      <select
        onChange={handleSelect}
        className="border p-2 rounded-md bg-white outline-none border-primary-light text-gray-800"
        value=""
      >
        <option value="" >Select language</option>
        {languageOptions.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>

      {value.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {value.map((langCode) => (
            <span
              key={langCode}
              className="flex items-center gap-1 bg-blue-100 text-primary px-2 py-1 rounded-full text-sm"
            >
              {ISO6391.getNativeName(langCode) || langCode}
              <button
                onClick={() => handleRemove(langCode)}
                className="text-primary hover:text-red-700/80 cursor-pointer"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelect;
