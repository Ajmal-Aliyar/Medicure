import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import { useConsultationSocketEvents } from "@/hooks/useConsultationSocketEvents";
import RoomAppointmentDetails from "./components/RoomAppointmentDetails";
import VideoPlayer from "./components/VideoPlayer";
import { useConsultationCall } from "@/hooks/useConsultationCall";
import { VideoControls } from "./components/VideoCallControlls";
import { BriefcaseMedical, ChevronRight, FileText } from "lucide-react";
import { UpdatePrescriptionForm } from "./components/UpdatePrecriptionForm";
import usePrescription from "@/hooks/usePrescription";
import toast from "react-hot-toast";
import type { IRole } from "@/types/auth";
import ListRecords from "../patient/MedicalRecord/components/ListRecords";

const ConsultationPage = () => {
    const { user } = useSelector((state: RootState) => state.auth)
    const { patientId, doctorId, roomId, appointmentId } = useSelector((state: RootState) => state.consultation)
    const [isPrescription, setIsPrescription] = useState<boolean>(false)
    const [isMedicalRecord, setIsMedicalRecord] = useState<boolean>(false)
    const { onUpdate, prescriptionDetails, setPrescriptionDetails, prescriptionUpdated } = usePrescription({ prescriptionId: null, doctorId: doctorId as string, patientId: patientId as string, appointmentId: appointmentId as string, setIsPrescription, role: user?.role as IRole })

    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const [videoOn, setVideoOn] = useState<boolean>(true)
    const [audioOn, setAudioOn] = useState<boolean>(true)

    const remoteUserId = user?.role === 'patient' ? doctorId as string : patientId as string
    const {
        addIceCandidate, onClose,
        callStarted, handleRemoteJoin,
        join, onAnswerReceived, onOfferReceived } = useConsultationCall(
            {
                userId: user?.id as string, audioOn, patientId: patientId as string,
                localVideoRef, remoteUserId, remoteVideoRef,
                roomId: roomId as string, videoOn
            })

    useConsultationSocketEvents({ handleRemoteJoin, onAnswerReceived, onOfferReceived, addIceCandidate })

    const onToggleTrack = (type: "audio" | "video") => {
        const stream = localVideoRef.current?.srcObject as MediaStream;
        const tracks = type === "audio" ? stream?.getAudioTracks() : stream?.getVideoTracks();
        tracks?.forEach((track) => (track.enabled = !track.enabled));
        type === "audio" ? setAudioOn((p) => !p) : setVideoOn((p) => !p);
    };


    const handleEndCall = () => {
        if (!prescriptionUpdated && user?.role === 'doctor') {
            toast.error('Update prescription !')
        } else {
            onClose()
        }
    }
    return (
        <>
            <div>chat</div>
            <div className="col-span-4 flex flex-col h-screen ">
                <div className="w-full h-12 bg-surface"></div>
                <div className="flex flex-1 bg-background p-2 rounded-md">
                    <div className={`${callStarted ? "relative flex flex-col rounded-md" : "fixed top-0 left-0  p-10 z-0 bg-surface-dark "} w-full h-full items-center justify-end overflow-hidden`}>
                        <div className={`${callStarted ? "" : "bg-background grid grid-cols-4 gap-2 p-3"} w-full h-full rounded-md `}>
                            {!callStarted && <RoomAppointmentDetails />}
                            <div className={`${callStarted ? "w-full h-full relative" : "col-span-3  bg-surface "} flex flex-col items-center justify-center `}>

                                {callStarted && <div className="h-fit w-full shadow-xl">
                                    <VideoPlayer videoRef={remoteVideoRef} />
                                </div>}
                                <div className={`${callStarted ? " w-full h-full absolute max-w-[225px] max-h-[150px] rounded-md left-2 bottom-0" : "max-w-[500px]"}  w-full`}>
                                    <VideoPlayer videoRef={localVideoRef} isLocal={true} />
                                </div>
                                <div className=" bg-surface gap-3 w-full flex items-center  rounded-b-md overflow-hidden">
                                    <VideoControls
                                        callStarted={callStarted} roomId={roomId || ''}
                                        audioOn={audioOn} videoOn={videoOn} onJoin={join}
                                        onToggleAudio={() => onToggleTrack("audio")}
                                        onToggleVideo={() => onToggleTrack("video")}
                                        onClose={handleEndCall}
                                        className={`${callStarted ? "" : "mt-10"} w-full px-3`} />
                                    {callStarted && <>
                                        {user?.role === 'doctor' && <div className="p-1 rounded-md hover:cursor-pointer bg-background active:scale-95 text-primary shadow-md ml-4"
                                            onClick={() => setIsPrescription(true)}><FileText strokeWidth={2} /></div>}
                                        <div className=" p-1 rounded-md hover:cursor-pointer bg-background active:scale-95 text-primary shadow-md mr-4"
                                            onClick={() => setIsMedicalRecord(true)}><BriefcaseMedical strokeWidth={2} /></div>
                                    </>}</div>
                            </div>
                            {callStarted && isPrescription && <UpdatePrescriptionForm initialData={prescriptionDetails} onUpdate={onUpdate} onClose={() => setIsPrescription(false)} setFormData={setPrescriptionDetails} />}
                            {callStarted && isMedicalRecord && <div className="p-4 fixed right-0 top-0  flex flex-col h-full bg-white lg:min-w-[600px]">
                                <div className="border w-fit rounded-md text-primary cursor-pointer mb-2" onClick={() => setIsMedicalRecord(false)}><ChevronRight /></div>
                                <ListRecords appointmentId={appointmentId as string} role={user?.role as 'patient' | 'doctor'} /> </div>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConsultationPage