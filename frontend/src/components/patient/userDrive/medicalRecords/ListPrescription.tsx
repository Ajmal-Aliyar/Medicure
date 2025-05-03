import { FC, useEffect, useRef, useState } from "react";
import { fetchUserPrescriptionsApi, IPrescription } from "../../../../sevices/medicalRecords/medicalRecord";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { convertToDateAndTime } from "../../../../utils/timeStructure";
import html2pdf from "html2pdf.js";


const ListPrescription: FC = () => {
    const [prescriptions, setPrescriptions] = useState<IPrescription[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [skip, setSkip] = useState<number>(0);
    const [limit] = useState<number>(5);
    const [total, setTotal] = useState<number>(0);
    const [selected, setSelected] = useState<IPrescription | null>(null)
    const pdfRef = useRef<HTMLDivElement>(null);
    const [download, setDownload] = useState<boolean>(false)

    useEffect(() => {
        const fetchTestReports = async () => {
            try {
                const response = await fetchUserPrescriptionsApi(skip, limit)
                console.log(response, 'perisdfa dsfn;l');
                setTotal(response.total)
                setPrescriptions(response.prescriptions);
            } catch (err) {
                setError("Failed to fetch test reports. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchTestReports();
    }, [skip]);


    const handleDownload = () => {
        setDownload(true)
        if (pdfRef.current) {
            setTimeout(() => {
                const filename = `${selected?.doctorDetails?.fullName?.replace(/\s+/g, '-')}-prescription.pdf`;
                html2pdf().from(pdfRef.current).save(filename);
                setDownload(false)
            }, 200);
        }
    };


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

                {!loading && !error && prescriptions.length === 0 && (
                    <p>No reports available. Please upload one.</p>
                )}

                {prescriptions.map((prescription) => (
                    <div key={prescription._id} className="max-w-[600px] mb-2 outline outline-gray-200 p-2 rounded-md flex justify-between items-center">
                        <div className="flex gap-4 items-center">
                            <img src={prescription.doctorDetails.profileImage} className="w-16 rounded-full overflow-hidden" alt="" />
                            <div>
                                <p className="text-md text-[#2f3c62d8] font-medium ">{prescription.doctorDetails.fullName}</p>
                                <p className="text-md text-[#51aff6] font-medium ">{prescription.doctorDetails.specialization}</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 text-sm items-center">
                            <p>diagnosis : {prescription.diagnosis}</p>
                            <p>date : {convertToDateAndTime(prescription.createdAt)}</p>
                        </div>
                        <div className="flex gap-4 items-center">
                            <p className="text-blue-500 cursor-pointer mr-3 hover:underline active:scale-95 duration-300"
                                onClick={() => setSelected(prescription)}>view</p>
                        </div>
                    </div>
                )
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

            {selected &&
                <div className="w-[100%] h-[100%] fixed top-0 left-0 bg-black/20 flex justify-center items-center">
                    <div className="min-w-[350px] md:min-w-[450px] relative max-w-[500px] bg-white rounded-md p-2">
                        <div className="absolute right-3 top-3 text-white bg-[#51aff6c5] rounded-sm active:scale-95"
                            onClick={() => setSelected(null)}><X /> </div>
                        <div className="flex gap-4 items-center border-b pb-2 border-gray-200">
                            <img src={selected?.doctorDetails.profileImage} className="w-16 rounded-full overflow-hidden" alt="" />
                            <div>
                                <p className="text-md text-[#2f3c62d8] font-medium ">{selected?.doctorDetails.fullName}</p>
                                <p className="text-md text-[#51aff6] font-medium ">{selected?.doctorDetails.specialization}</p>
                            </div>
                        </div>
                        <div
                            ref={pdfRef}
                            style={{
                                fontFamily: "Arial, sans-serif",
                                fontSize: "14px",
                                color: "#333",
                                padding: "20px",
                                borderRadius: "8px",
                                maxWidth: "100%",
                                backgroundColor: "#fff"
                            }}
                        >
                            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Prescription Summary</h2>

                            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                <tbody>
                                    <tr>
                                        <td style={{ padding: "8px", border: "1px solid #ccc", fontWeight: "bold" }}>Diagnosis</td>
                                        <td style={{ padding: "8px", border: "1px solid #ccc" }}>{selected.diagnosis}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: "8px", border: "1px solid #ccc", fontWeight: "bold" }}>Allergy</td>
                                        <td style={{ padding: "8px", border: "1px solid #ccc" }}>{selected.allergy}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: "8px", border: "1px solid #ccc", fontWeight: "bold" }}>Prescription</td>
                                        <td style={{ padding: "8px", border: "1px solid #ccc" }}>{selected.prescription}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: "8px", border: "1px solid #ccc", fontWeight: "bold" }}>Date</td>
                                        <td style={{ padding: "8px", border: "1px solid #ccc" }}>{convertToDateAndTime(selected.createdAt)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="w-full flex justify-end">
                            <button
                            disabled={download}
                                onClick={handleDownload}
                             className={`px-2 border rounded-md mt-2 mr-2 active:scale-95 cursor-pointer ${download ? 'border-gray-400 text-gray-400' : ''}`}>Download</button>
                        </div>
                    </div>
                </div>
            }


        </>
    )
}

export default ListPrescription
