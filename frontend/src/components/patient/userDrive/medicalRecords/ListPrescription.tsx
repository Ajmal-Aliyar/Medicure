import { FC, useEffect, useState } from "react";
import { fetchUserPrescriptionsApi, IPrescription } from "../../../../sevices/medicalRecords/medicalRecord";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { convertTo12HourFormat } from "../../../../utils/timeStructure";


const ListPrescription: FC = () => {
    const [prescriptions, setPrescriptions] = useState<IPrescription[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [skip, setSkip] = useState<number>(0);
    const [limit] = useState<number>(5);
    const [total, setTotal] = useState<number>(0);
    const [selected, setSelected] = useState<IPrescription | null>(null)

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
                            <p>date : {convertTo12HourFormat(prescription.createdAt)}</p>
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

            { selected &&
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
                            <div className="grid grid-cols-3 text-sm text-gray-500 gap-2 py-3">
                                <p>Diagnosis</p>
                                <p className="col-span-2">{selected.diagnosis}</p>
                                <p>Allergy</p>
                                <p className="col-span-2">{selected.allergy}</p>
                                <p>Prescription</p>
                                <p className="col-span-2">{selected.prescription}</p>
                                <p>Date</p>
                                <p className="col-span-2">{convertTo12HourFormat(selected.createdAt)}</p>
                            </div>
                    </div>
                </div>
            }


        </>
    )
}

export default ListPrescription
