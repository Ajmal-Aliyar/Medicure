import { FC, useEffect, useState } from "react"
import { convertTimestampToDate } from "../../../../utils/timeStructure";
import { api } from "../../../../utils/axiosInstance";

interface ListRecordsProps {
    _id: string;
}

const ListRecords: FC<ListRecordsProps> = ({ _id }) => {
    const [testReports, setTestReports] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchTestReports = async () => {
            try {
                const response: any = await api.get(`/api/report/${_id}`);
                setTestReports(response.data.reverse());
            } catch (err) {
                setError("Failed to fetch test reports. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchTestReports();
    }, [_id]);
    return (
        <>
            {loading && <p>Loading reports...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && !error && testReports.length === 0 && (
                <p>No reports available. Please upload one.</p>
            )}

            {testReports.length > 0 && (
                <ul className="mb-6 z-20 text-black">
                    {testReports.map((report, index) => (
                        <li
                            key={index}
                            className="flex justify-between items-center p-4 mb-3 border rounded-md"
                        >
                            <div className="">
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
        </>
    )
}

export default ListRecords
