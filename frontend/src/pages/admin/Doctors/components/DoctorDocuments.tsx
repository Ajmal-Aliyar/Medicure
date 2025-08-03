import type { DoctorProfileForAdmin } from "@/types/doctor";

interface Props {
    data: DoctorProfileForAdmin;
}
const DocumentItem = ({
    label,
    src,
}: {
    label: string;
    src: string | null;
}) => (
    <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-gray-700">{label}</p>
        {src ? (
            <img
                src={src}
                alt={`${label}`}
                className="max-w-[10rem] rounded-md text-xs"
            />
        ) : (
            <span className="text-gray-400 italic text-sm">Not uploaded</span>
        )}
    </div>
);

const DoctorDocuments = ({ data }: Props) => {
    const { documents, registration } = data;



    return (
        <div>
            <h2 className="text-xl text-secondary font-semibold mb-4">Documents & Registration</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <DocumentItem label="Identity Proof" src={documents.identityProof} />
                <DocumentItem
                    label="Medical Registration"
                    src={documents.medicalRegistration}
                />
                <DocumentItem
                    label="Establishment Proof"
                    src={documents.establishmentProof}
                />
            </div>

            <div className="grid grid-cols-1  gap-4">
                <p className="break-words whitespace-normal">
                    <strong>Registration Number:</strong> {registration.registrationNumber || "—"}
                </p>
                <p className="break-words whitespace-normal">
                    <strong>Council:</strong> {registration.registrationCouncil || "—"}
                </p>
                <p className="break-words whitespace-normal">
                    <strong>Year:</strong> {registration.registrationYear || "—"}
                </p>
            </div>
        </div>
    );
};

export default DoctorDocuments;
