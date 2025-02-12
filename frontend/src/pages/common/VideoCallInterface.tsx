import { useEffect, useRef, useState } from "react";
import ConsultLanding from "./ConsultLanding";
import { getLocalPreviewAndInitRoomConnection, streamEvents } from "../../utils/webrtc";
import { Mic, MicOff, Phone, Pin, Video, VideoOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { stopStreaming } from '../../utils/webrtc';
import { clearWarning, setExtra, setWarning } from "../../store/slices/commonSlices/notificationSlice";

const VideoCallInterface = () => {
  const [callStarted, setCallStarted] = useState<boolean>(false);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [videoOn, setVideoOn] = useState<boolean>(true);
  const [pinned, setPinned] = useState<"A" | "B">("A");
  const [micOn, setMicOn] = useState<boolean>(true);

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const client = useSelector((state: RootState) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()


  useEffect(() => {
    const initLocalStream = async () => {
      try {
        const stream = await getLocalPreviewAndInitRoomConnection();
        setLocalStream(stream);
        if (localVideoRef.current && stream) {
          localVideoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error initializing local stream:", error);
      }
    };

    initLocalStream();

    const handleNewStream = (stream: MediaStream) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = stream;
      }
    };

    streamEvents.on("new-remote-stream", handleNewStream);

    return () => {


      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = null;
      }
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = null;
      }
    };
  }, [callStarted, videoOn]);

  const toggleVideo = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setVideoOn(videoTrack.enabled);
      }
    }
  };

  const toggleAudio = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setMicOn(audioTrack.enabled);
      }
    }
  };

  const stopTrackingStream = () => {
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
      setLocalStream(null);
    }

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }

    stopStreaming();

    if (client.role === "user") {
      navigate("/user/drive/appointments");
    } else if (client.role === "doctor") {
      navigate("/doctor/appointments");
      window.location.reload();
    } else {
      navigate("/user");
    }
    dispatch(clearWarning())
  }

  const handleEndCall = (): void => {
    console.log('sdfasdfn')
    dispatch(setWarning('Are you do you finish the consultation'))
    dispatch(setExtra(stopTrackingStream))
  };
  return (
    <div className="fixed top-0 w-screen h-screen bg-[#1d1d1d] p-4 text-white flex justify-center items-center">
      {!callStarted && <ConsultLanding localVideoRef={localVideoRef} setCallStarted={setCallStarted} />}
      {callStarted && (
        <>
          <div className="w-full h-full relative">
            <div
              className={`flex flex-col gap-2 items-center justify-center ${pinned === "A" ? "bg-neutral-900 w-full h-full" : "bg-neutral-900 w-[30%] md:w-[300px] md:aspect-video aspect-[2/3] m-2 z-10"
                } rounded-md overflow-hidden absolute top-0 group duration-300`}
            >
              {videoOn ? (
                <video ref={localVideoRef} autoPlay muted className="w-full h-full bg-black" />
              ) : (
                <div className="w-36 h-36 bg-gray-600 rounded-full overflow-hidden">
                  {profileImage && <img src={profileImage} alt="" />}
                </div>
              )}
              <p className={`absolute bottom-1 left-2 ${pinned === "A" ? "" : "text-white translate-y-6 group-hover:-translate-y-0 duration-300"} text-md`}>
                Shruti Ked
              </p>
              <div className={`absolute top-1 right-2 ${pinned === "A" ? "hidden" : "-translate-y-6 translate-x-6 group-hover:-translate-y-0 group-hover:translate-x-0 duration-300"}`} onClick={() => setPinned("A")}>
                <Pin size={18} strokeWidth={1.25} className="rotate-45" />
              </div>
            </div>

            {remoteVideoRef && (
              <div
                className={`flex flex-col gap-2 items-center justify-center overflow-hidden group ${pinned === "B" ? "bg-neutral-900 w-full h-full" : "bg-neutral-900 w-[30%] md:w-[300px] md:aspect-video aspect-[2/3] m-2 z-10"
                  } rounded-md overflow-hidden absolute top-0 group duration-300`}
              >
                <video ref={remoteVideoRef} autoPlay muted className="w-full h-full" />
                <p className={`absolute bottom-1 left-2 ${pinned === "B" ? "" : "text-white translate-y-6 group-hover:-translate-y-0 duration-300"} text-md`}>
                  Shruti Ked
                </p>
                <div className={`absolute top-1 right-2 ${pinned === "B" ? "hidden" : "-translate-y-6 translate-x-6 group-hover:-translate-y-0 group-hover:translate-x-0 duration-300"}`} onClick={() => setPinned("B")}>
                  <Pin size={18} strokeWidth={1.25} className="rotate-45" />
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3 absolute bottom-6 left-[50%] -translate-x-[50%]">
            <button onClick={toggleAudio} className={`px-5 py-2 ${micOn ? "bg-gray-500" : "bg-gray-700"} opacity-30 h-fit w-fit rounded-md`}>
              {micOn ? <Mic size={32} strokeWidth={2.25} /> : <MicOff size={32} strokeWidth={2.25} />}
            </button>

            <button onClick={handleEndCall} className="px-5 py-2 bg-red-500 h-fit w-fit rounded-md">
              <Phone size={32} strokeWidth={2.25} className="rotate-[135deg]" />
            </button>

            <button onClick={toggleVideo} className={`px-5 py-2 ${videoOn ? "bg-gray-500" : "bg-gray-700"} opacity-30 h-fit w-fit rounded-md`}>
              {videoOn ? <Video size={32} strokeWidth={2.25} /> : <VideoOff size={32} strokeWidth={2.25} />}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default VideoCallInterface;
