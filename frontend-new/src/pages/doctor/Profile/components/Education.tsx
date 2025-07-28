import { useEffect, useState } from "react";
import type { IEducation, ProfileState } from "@/slices/doctorSlice";
import { Button } from "@/components/ui/Button";

const Education = ({ doctor }: { doctor: ProfileState | null }) => {
  const [educationList, setEducationList] = useState(doctor?.educations || []);
  const [showForm, setShowForm] = useState(false);
  const [newEducation, setNewEducation] = useState<{ degree: string, university: string, yearOfCompletion: number }>({
    degree: "",
    university: "",
    yearOfCompletion: new Date().getFullYear(),
  });

  useEffect(() => {
    if (doctor?.educations) {
      setEducationList(doctor.educations);
    }
  }, [doctor]);
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEducation((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddEducation = () => {
    if (
      !newEducation.degree.trim() ||
      !newEducation.university.trim() ||
      !newEducation.yearOfCompletion
    ) return;

    newEducation.yearOfCompletion && setEducationList((prev: IEducation[]) => [...prev, newEducation]);
    setNewEducation({ degree: "", university: "", yearOfCompletion: new Date().getFullYear() });
    setShowForm(false);
  };
  return (
    <div className="bg-white rounded-md shadow-md p-4 col-span-1 md:col-span-2">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Education</h3>
        <Button variant="muted" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "Add"}
        </Button>
      </div>

      {educationList.length ? (
        <ul className="text-sm text-gray-700 list-disc ml-6 space-y-1">
          {educationList.map((item, index) => (
            <li key={index} className="leading-snug">
              <span className="font-medium">{item.degree}</span>, {item.university} -{" "}
              <span className="text-gray-500">{item.yearOfCompletion}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-400 italic ml-1">No education details available.</p>
      )}

      {showForm && (
        <div className="mt-4 space-y-3">
          <input
            type="text"
            name="degree"
            placeholder="Degree"
            value={newEducation.degree}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2 text-sm"
          />
          <input
            type="text"
            name="university"
            placeholder="University"
            value={newEducation.university}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2 text-sm"
          />
          <input
            type="text"
            name="yearOfCompletion"
            placeholder="Year of Completion"
            value={newEducation.yearOfCompletion}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2 text-sm"
          />
          <Button onClick={handleAddEducation} className="w-full">
            Save
          </Button>
        </div>
      )}
    </div>
  );
};

export default Education;
