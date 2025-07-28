import ListRecords from "./components/ListRecords";
import toast from "react-hot-toast";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ImageUploader } from "./components/Uploader";
import { EditProfilePortal } from "@/components/common/EditProfilePortal";
import { patientMedicalRecordService } from "@/services/api/patient/medical-record";


const MedicalRecord = () => {
    const [upload, setUpload] = useState<boolean>(false)
   
    const requestUpdateProfileImage = async ( fileUrl: string, fileName: string) => {
        const response = await patientMedicalRecordService.updateMedicalRecords( fileUrl, fileName)
        console.log(response);

        toast.success("'Medical record upload successfully.'")
    };
    return (
        <div className="w-full flex flex-col gap-4 h-[560px]  max-w-[600px] overflow-auto">
            {upload && <EditProfilePortal onClose={() => setUpload(false)}>
                <ImageUploader requestUpdateProfileImage={requestUpdateProfileImage} setEditProfile={setUpload} />
            </EditProfilePortal>}
            <div className="flex justify-between mb-5">
                <p className="text-secondary-dark ">Upload your medical record history here. </p>
            <Button className="px-2 py-1" variant="green" onClick={() => setUpload(true)}>upload</Button>
            </div>
            <ListRecords role="patient" />
        </div>
    );
};

export default MedicalRecord;

