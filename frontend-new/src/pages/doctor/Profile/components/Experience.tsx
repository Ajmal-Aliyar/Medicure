import { useState } from "react";
import type { IExperience, ProfileState } from "@/slices/doctorSlice";
import { Button } from "@/components/ui/Button";

const Experience = ({ doctor }: { doctor: ProfileState | null }) => {
  const [experienceList, setExperienceList] = useState<IExperience[]>(doctor?.experiences || []);
  const [showForm, setShowForm] = useState(false);
  const [newExperience, setNewExperience] = useState<IExperience>({
    place: "",
    year: "",
    experience: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewExperience((prev) => ({
      ...prev,
      [name]: name === "experience" ? Number(value) : value,
    }));
  };

  const handleAddExperience = () => {
    if (
      !newExperience.place.trim() ||
      !newExperience.year.trim() ||
      !newExperience.experience
    ) return;

    setExperienceList((prev) => [...prev, newExperience]);
    setNewExperience({ place: "", year: "", experience: 0 });
    setShowForm(false);
  };

  return (
    <div className="bg-white rounded-md shadow-md p-4 col-span-1 md:col-span-2">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Experience</h3>
        <Button variant="muted" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "Add"}
        </Button>
      </div>

      {experienceList.length ? (
        <ul className="text-sm text-gray-700 list-disc ml-6 space-y-1">
          {experienceList.map((item, index) => (
            <li key={index} className="leading-snug">
              <span className="font-medium">{item.place}</span> - {item.year} (<span>{item.experience} years</span>)
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-400 italic ml-1">No experience details available.</p>
      )}

      {showForm && (
        <div className="mt-4 space-y-3">
          <input
            type="text"
            name="place"
            placeholder="Hospital/Clinic"
            value={newExperience.place}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2 text-sm"
          />
          <input
            type="text"
            name="year"
            placeholder="Year"
            value={newExperience.year}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2 text-sm"
          />
          <input
            type="number"
            name="experience"
            placeholder="Experience (in years)"
            value={newExperience.experience}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2 text-sm"
          />
          <Button onClick={handleAddExperience} className="w-full">
            Save
          </Button>
        </div>
      )}
    </div>
  );
};

export default Experience;
