import { FilterBox } from "@/components/ui/FilterBox";
import { FilterSection } from "@/components/ui/FilterSection";
import LanguageSelect from "@/components/ui/LanguageSelect";
import NumberInput from "@/components/ui/NumberInput";
import StatusSelect from "@/components/ui/SelectBox";
import { SpecializationSelector } from "@/components/ui/SpecializationSelector";
import { useRole } from "@/hooks";



const profileStatusOptions = ["pending", "rejected", "approved", "applied"];
const accountStatusOptions = ["blocked", "unblocked"];

interface DoctorFilterProps {
    language: string[];
    setLanguage: (value: string[]) => void;
    specialization?: string | null;
    setSpecialization?: (spec: string | null) => void
    profileStatus: string;
    setProfileStatus: (value: string) => void;
    accountStatus: string;
    setAccountStatus: (value: string) => void;
    experienceRange: { min: string; max: string };
    setExperienceRange: (value: { min: string; max: string }) => void;
    ratingRange: { min: string; max: string };
    setRatingRange: (value: { min: string; max: string }) => void;
}

export const DoctorFilter = ({
    language,
    setLanguage,
    specialization,
    setSpecialization,
    profileStatus,
    setProfileStatus,
    accountStatus,
    setAccountStatus,
    experienceRange,
    setExperienceRange,
    ratingRange,
    setRatingRange,
}: DoctorFilterProps) => {
    const onRemove = () => {
        setLanguage([]);
        setProfileStatus("");
        setSpecialization && setSpecialization(null);
        setAccountStatus("");
        setExperienceRange({ min: "", max: "" });
        setRatingRange({ min: "", max: "" });
    };

    const role = useRole()
   const isFiltered = () =>
  language.length > 0 ||
  profileStatus !== "" ||
  !!specialization ||
  accountStatus !== "" ||
  experienceRange.min !== "" ||
  experienceRange.max !== "" ||
  ratingRange.min !== "" ||
  ratingRange.max !== "";


    return (
        <FilterBox label="Filter" className="pt-3 text-muted-dark" onRemove={<button onClick={onRemove} className={`text-xs cursor-pointer font-bold ${isFiltered() ? "text-primary z-20" : "hidden"}`}>Clear</button>}>
            <div className="flex flex-col gap-3 text-sm p-5">
                <div className="flex flex-col gap-4 ">
                    <FilterSection title="experience">
                        <p>min:</p>
                        <NumberInput
                            value={Number(experienceRange.min) || 0}
                            onChange={(num) =>
                                setExperienceRange({ ...experienceRange, min: num.toString() })
                            }
                            min={0}
                            max={100}
                            step={1}
                            label="Rating Max"
                        />
                        <p>max:</p>
                        <NumberInput
                            value={Number(experienceRange.max) || 0}
                            onChange={(num) =>
                                setExperienceRange({ ...experienceRange, max: num.toString() })
                            }
                            min={0}
                            max={100}
                            step={1}
                            label="Rating Max"
                        />

                    </FilterSection>

                    <FilterSection title="rating">
                        <p>min:</p>
                        <NumberInput
                            value={Number(ratingRange.min) || 0}
                            onChange={(num) =>
                                setRatingRange({ ...ratingRange, min: num.toString() })
                            }
                            min={0}
                            max={100}
                            step={1}
                            label="Rating Max"
                        />
                        <p>max:</p>
                        <NumberInput
                            value={Number(ratingRange.max) || 0}
                            onChange={(num) =>
                                setRatingRange({ ...ratingRange, max: num.toString() })
                            }
                            min={0}
                            max={100}
                            step={1}
                            label="Rating Max"
                        />

                    </FilterSection>
                </div>
                {specialization && setSpecialization && <SpecializationSelector selected={specialization} setSelected={setSpecialization} />}
                <LanguageSelect
                    value={language}
                    onChange={setLanguage}
                    label="Languages"
                />
                {role === 'admin' && <div className="flex gap-2">
                    <StatusSelect
                        className="w-[50%]"
                        value={profileStatus}
                        onChange={setProfileStatus}
                        statusOptions={profileStatusOptions}
                        label="Profile Status"
                        placeholder="All"
                    />
                    <StatusSelect
                        className="w-[50%]"
                        value={accountStatus}
                        onChange={setAccountStatus}
                        statusOptions={accountStatusOptions}
                        label="Account Status"
                        placeholder="All"
                    />
                </div>}
            </div>
        </FilterBox>
    )
}

