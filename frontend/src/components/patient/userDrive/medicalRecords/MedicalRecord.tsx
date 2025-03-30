import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import ListRecords from "./ListRecords";
import { ChevronRight } from "lucide-react";
import UploadReport from "./UploadReport";
import ListPrescription from "./ListPrescription";


const MedicalRecord: FC = () => {
    const [page, setPage] = useState<'prescription' | 'medical-report'>('prescription')
    const { _id } = useSelector((state: RootState) => state.auth)

    return (
        <div className="w-full flex flex-col gap-4 h-[560px] overflow-auto">
            <div className="flex justify-between items-center ">
                <div className="flex gap-2 font-medium text-md cursor-pointer ">
                    <p onClick={() => setPage('prescription')} className={`flex justify-center items-center ${page !== 'medical-report' ? 'text-[#2f3c62f8]' : 'text-[#2f3c6294]'}`}>Prescriptions <ChevronRight size={20} strokeWidth={2} /></p>
                    <p onClick={() => setPage('medical-report')} className={`flex justify-center items-center ${page !== 'prescription' ? 'text-[#2f3c62f8]' : 'text-[#2f3c6294]'}`}>Medical Reports <ChevronRight size={20} strokeWidth={2} /></p>
                </div>
                { page === "medical-report" && <UploadReport />}
            </div>

            { page === "medical-report" && <ListRecords _id={_id} />}
            { page === "prescription" && <ListPrescription /> }

        </div>
    );
};

export default MedicalRecord;

