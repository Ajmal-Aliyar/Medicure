import { FC, useEffect, useState } from "react"
import { convertTimestampToDate } from "../../../../utils/timeStructure";
import { fetchTestReportsApi, ITestReport } from "../../../../sevices/medicalRecords/testReports";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ListRecordsProps {
    _id: string;
}

const ListRecords: FC<ListRecordsProps> = ({ _id }) => {
    const [testReports, setTestReports] = useState<ITestReport[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [skip, setSkip] = useState<number>(0);
    const [limit] = useState<number>(5);
    const [total, setTotal] = useState<number>(0);
    useEffect(() => {
        const fetchTestReports = async () => {
            try {

                const response = await fetchTestReportsApi(_id, skip, limit)
                setTotal(response.total)
                setTestReports(response.testReport);
            } catch (err) {
                setError("Failed to fetch test reports. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchTestReports();
    }, [_id, skip]);

    const handleNext = () => {
        if (skip + limit < total) {
            setSkip(skip + limit);
        }
    };

    const handlePrev = () => {
        if (skip - limit >= 0) {
            setSkip(skip - limit);
        }
    };
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
                                <div className="text-[#2f3c62d8] font-medium min-h-10 flex  items-center">
                                    <span className="mr-4">{convertTimestampToDate(report.uploadedAt)}</span>
                                    <span>{report.testType}</span>
                                </div>
                                {report.fileUrl ? (
                                    <a
                                        href={report.fileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:underline"
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

            <div className="flex justify-center mt-4 gap-1 text-white">
                <button onClick={handlePrev} disabled={skip === 0} className="px-2 py-1 bg-[#51aff666] rounded"><ChevronLeft /></button>
                {Array.from({ length: Math.ceil(total / limit) }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => setSkip(index * limit)}
                        className={`px-3 py-1 rounded ${skip / limit === index ? 'bg-[#51aff6ce] text-white' : 'bg-[#51aff630]'}`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button onClick={handleNext} disabled={skip + limit >= total} className="px-2 py-1 bg-[#51aff666] rounded"><ChevronRight /></button>
            </div>

         
        </>
    )
}

export default ListRecords
