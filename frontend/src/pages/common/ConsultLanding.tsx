
import { Phone } from 'lucide-react';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createNewRoom, joinRoom } from '../../utils/wss';

interface ConsultLandingProps {
    localVideoRef: React.RefObject<HTMLVideoElement>;
    setCallStarted: (started: boolean) => void;
}

const ConsultLanding:React.FC <ConsultLandingProps> = ({localVideoRef, setCallStarted}) => {
    const roomId = useSelector((state: RootState) => state.videoConsult.roomId)  
    const doctorId = useSelector((state: RootState) => state.auth._id)
    const navigate = useNavigate();

    const createRoomHandler = () => {
        if (roomId) {
            createNewRoom(doctorId, roomId)
            setCallStarted(true)
            joinRoom(doctorId,roomId)
        }
    }
    return (
        <>
            <video
                ref={localVideoRef}
                autoPlay
                muted
                className="min-w-[300px] min-h-[300px] bg-black rounded-lg shadow-md"
            />
            <div className="flex gap-3 absolute bottom-6 left-[50%] -translate-x-[50%]">
                <button
                    onClick={createRoomHandler}
                    className="px-5 py-2 bg-green-500 h-fit w-fit rounded-md"
                >
                    <Phone size={32} strokeWidth={2.25} className="text-white" />
                </button>
            </div>
        </>
    )
}

export default ConsultLanding
