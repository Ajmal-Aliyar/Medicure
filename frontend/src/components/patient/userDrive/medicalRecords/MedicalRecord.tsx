import { FC} from "react";
import UploadReport from "./UploadReport";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import ListRecords from "./ListRecords";


const MedicalRecord: FC = () => {
    const {_id} = useSelector((state: RootState) => state.auth)

    return (
        <div className="max-w-2xl mx-auto mt-10">
            <div className="flex justify-between  mb-6">
                <h2 className="text-3xl font-semibold text-gray-800">Medical Test Reports</h2>
                <UploadReport />
            </div>
            <ListRecords _id={_id} />
        </div>
    );
};

export default MedicalRecord;

