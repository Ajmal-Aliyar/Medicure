import { useDispatch, useSelector } from "react-redux";
import { setRoomId } from "../../store/slices/commonSlices/videoConsultSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import { setConsultRinging } from "../../store/slices/commonSlices/notificationSlice";



const ConsultationAlert = () => {
  const consultData = useSelector((state: RootState) => state.notification.consulting)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const createRoomHandler = (roomId: string, appointmentId: string, slotId: string) => {
    dispatch(setRoomId(roomId))
    navigate(`/consult/meeting/${roomId}?appointment=${appointmentId}&slot=${slotId}`)
    dispatch(setConsultRinging(null))
  }
  return (
    <div className={`anim mb-20 z-50 flex flex-col justify-center items-center  min-h-24 gap-5 overflow-hidden bg-[#dedede] shadow-lg max-w-[500px] rounded-md p-4 py-16 md:min-w-[600px] `}>
      <div className="w-16 h-16 rounded-full bg-green-500/50 flex items-center justify-center text-xl font-semibold text-gray-700 relative">
        <div className="absolute left-[50%] -translate-x-[50%] w-8 h-8 bg-green-500 rounded-full animate-ping"></div>
        <div className="absolute left-[50%] -translate-x-[50%] w-4 h-4 bg-green-500 blur-sm rounded-full "></div>
      </div>
      <div className="text-center mt-3">
        <h3 className="text-lg font-semibold text-gray-800">Doctor is Available</h3>
        <p className="text-sm text-gray-600">Join the consultation now</p>
      </div>
      {consultData &&
        <button className="mt-4 w-full max-w-[200px] bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg"
          onClick={() => createRoomHandler(consultData.roomId, consultData._id, consultData.slotId)}>
          Join Meeting
        </button>
      }

    </div>
  );
};

export default ConsultationAlert;
