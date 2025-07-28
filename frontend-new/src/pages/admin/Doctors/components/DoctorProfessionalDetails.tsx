import type { DoctorProfileForAdmin } from "@/types/doctor";

interface Props {
    data: DoctorProfileForAdmin;
}

const DoctorProfessional = ({ data }: Props) => {
    const { profile } = data;

    return (
        <div>
            <h2 className="text-xl text-secondary font-semibold mb-4">Professional Details</h2>
            <div className="grid grid-cols-2 gap-4">
                <p className="break-words whitespace-normal col-span-2"><strong>Headline:</strong> {profile.headline}</p>
                <p className="break-words whitespace-normal col-span-2"><strong>About:</strong> {profile.about}</p>
                <p className="break-words whitespace-normal"><strong>Specialization:</strong> {profile.specialization}</p>
                <p className="break-words whitespace-normal"><strong>Experience:</strong> {profile.yearsOfExperience} years</p>
                <p className="break-words whitespace-normal"><strong>Fees:</strong> {profile.fees.amount} {profile.fees.currency}</p>
                <p className="break-words whitespace-normal"><strong>Rating:</strong> {profile.rating.average ?? "N/A"} ({profile.rating.reviewCount} reviews)</p>
            </div>

            {profile.education.length > 0 && <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Education</h3>
                <ul className="list-disc pl-5 space-y-2">
                    {profile.education.map((edu, i) => (
                        <li key={edu._id || i}>
                            <p><strong>Degree:</strong> {edu.degree}</p>
                            <p><strong>University:</strong> {edu.university}</p>
                            <p><strong>Year of Completion:</strong> {edu.yearOfCompletion}</p>
                        </li>
                    ))}
                </ul>

            </div>}

           {profile.experience.length > 0 && <div className="mt-4">
                <h3 className="text-lg font-medium mb-2">Experience</h3>
                <ul className="list-disc pl-5">
                    {profile.experience.map((exp, i) => (
                         <li key={exp._id || i}>
                            <p><strong>Hospital:</strong> {exp.hospitalName}</p>
                            <p><strong>Role:</strong> {exp.role}</p>
                            <p><strong>Year:</strong> {exp.startDate.toString()} - {exp.endDate.toString()}</p>
                            <p><strong>Descriptioon:</strong> {exp.description}</p>
                        </li>
                    ))}
                </ul>
            </div>}
        </div>
    );
};

export default DoctorProfessional;
