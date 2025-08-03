import type { RootState } from "@/app/store";
import { ConfirmationModal } from "@/components/domain/Modals/ConfirmationModal";
import { Button } from "@/components/ui/Button";
import { doctorAppointmentService } from "@/services/api/doctor/appointment";
import {
  Mic,
  MicOff,
  Phone,
  Stethoscope,
  Video,
  VideoOff,
} from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

interface Props {
  callStarted: boolean;
  videoOn: boolean;
  audioOn: boolean;
  onToggleVideo: () => void;
  onToggleAudio: () => void;
  onJoin: () => void;
  className?: string;
  onClose: () => void;
  roomId: string;
}

export const VideoControls = ({
  callStarted,
  videoOn,
  audioOn,
  onToggleVideo,
  onToggleAudio,
  onJoin,
  className,
  onClose,
  roomId
}: Props) => {
    const {user} = useSelector((state: RootState) => state.auth)
  const [confirmJoinModal, setConfirmJoinModal] = useState(false);
  const [confirmLeaveModal, setConfirmLeaveModal] = useState(false);

  const handleJoin = () => {
    onJoin();
    setConfirmJoinModal(false);
  };

  const handleLeave = async () => {
    if(user?.role === 'doctor') await doctorAppointmentService.markAppointmentAsCompleted(roomId)
    onClose();
    setConfirmLeaveModal(false);
  };

  return (
    <>
      <div className={`flex gap-6 items-center justify-center  py-2 ${className}`}>
        <button
          onClick={onToggleVideo}
          className={`p-3 rounded-full transition duration-200 ${videoOn ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
          aria-label="Toggle Video"
        >
          {videoOn ? <Video size={20} /> : <VideoOff size={20} />}
        </button>

        {!callStarted ? (
          <Button onClick={() => setConfirmJoinModal(true)} className="px-8 py-2 text-md">
            Join Now
          </Button>
        ) : (
          <Button variant="red" onClick={() => setConfirmLeaveModal(true)} className="px-8 py-2 text-md">
            <Phone className="rotate-[130deg]" />
          </Button>
        )}

        <button
          onClick={onToggleAudio}
          className={`p-3 rounded-full transition duration-200 ${audioOn ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
          aria-label="Toggle Microphone"
        >
          {audioOn ? <Mic size={20} /> : <MicOff size={20} />}
        </button>
      </div>


      {confirmJoinModal && (
        <ConfirmationModal
          icon={<Stethoscope size={60} strokeWidth={2.5} className="text-white" />}
          title="Ready to Start?"
          description="You’re about to join the consultation session. Please make sure your camera and microphone are working properly."
          onCancel={() => setConfirmJoinModal(false)}
          onConfirm={handleJoin}
          confirmLabel="Join Consultation"
        />
      )}


      {confirmLeaveModal && (
        <ConfirmationModal
          icon={<Phone className="rotate-[130deg] text-white" size={60} strokeWidth={2.5} />}
          title="Leave Consultation?"
          description="Are you sure you want to end this consultation session?"
          onCancel={() => setConfirmLeaveModal(false)}
          onConfirm={handleLeave}
          confirmLabel="End Call"
          confirmVariant="red"
        />
      )}
    </>
  );
};
