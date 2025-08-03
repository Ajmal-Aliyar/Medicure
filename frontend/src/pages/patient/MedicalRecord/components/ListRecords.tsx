import { useEffect, useState } from "react"
import { formatDateToLong } from "@/utils/formatDate";
import { patientMedicalRecordService } from "@/services/api/patient/medical-record";
import type { IMedicalRecord, IMedicalRecordService } from "@/types/medical-record";
import { Pagination } from "@/components/ui/Pagination";
import { doctorMedicalRecordService } from "@/services/api/doctor/medical-record";

interface Props {
    role: 'patient' | 'doctor'
    appointmentId?: string
}

const ListRecords = ({role , appointmentId}: Props) => {
    const [testReports, setTestReports] = useState<IMedicalRecord[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(1);
    useEffect(() => {
        const fetchTestReports = async () => {
            try {
                const services: Record<"patient" | "doctor", IMedicalRecordService> = {
                    patient: patientMedicalRecordService,
                    doctor: doctorMedicalRecordService,
                };

                if (!services[role]) {
                    throw new Error("Invalid role");
                }

                const { data, meta } = await services[role].getMedicalRecords( page, appointmentId);
                setTotalPages(meta.totalPages || 1)
                setTestReports(data);
            } catch (err) {
                console.log(err);
                setError("Failed to fetch test reports. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchTestReports();
    }, []);


    return (
        <>
            <div className="h-[440px] overflow-hidden p-1 ">
                {loading && <p>Loading reports...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {!loading && !error && testReports.length === 0 && (
                    <p>No reports available. Please upload one.</p>
                )}

                {testReports.length > 0 && (
                    <ul className="mb-2 z-20 text-black">
                        {testReports.map((report, index) => (
                            <li
                                key={index}
                                className="max-w-[600px] mb-2 outline outline-gray-200 p-2 rounded-md flex justify-between items-center"
                            >
                                <div className="text-[#2f3c62d8] font-medium min-h-10 flex flex-col">
                                    <p className="font-semibold text-secondary">{report.fileName}</p>
                                    <span className="text-xs text-primary">{formatDateToLong(report.uploadedAt)}</span>
                                </div>
                                {report.fileUrl ? (
                                    <a
                                        href={report.fileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-secondary hover:underline"
                                    >
                                        View Report
                                    </a>
                                ) : (
                                    <span className="text-gray-400">No file available</span>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {totalPages > 1 && <Pagination currentPage={page} onPageChange={setPage} totalPages={totalPages} />}


        </>
    )
}

export default ListRecords
