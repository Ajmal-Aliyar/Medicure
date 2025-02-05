import { Mic, MicOff, Phone, Pin, Video, VideoOff } from "lucide-react";
import React from "react";
import { useEffect, useRef, useState } from "react";

const VideoCallInterface = () => {
  const [pinned, setPinned] = useState<"A" | "B">("A");
  const [micOn, setMicOn] = useState<boolean>(true);
  const [videoOn, setVideoOn] = useState<boolean>(true);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;

    if (videoOn) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: micOn })
        .then((mediaStream) => {
          stream = mediaStream;
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = mediaStream;
          }
        })
        .catch((err) => {
          console.error("Failed to access webcam: ", err);
          alert("Please enable the permission for consulting.");
        });
    } else {
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = null;
      }
    }

    // Cleanup the stream when the component unmounts or video turns off
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [videoOn, micOn]);

  const handleMicToggle = (): void => setMicOn(!micOn);
  const handleVideoToggle = (): void => setVideoOn(!videoOn);
  const handleEndCall = (): void => alert("Call ended!");

  return (
    <div className="fixed top-0 w-screen h-screen bg-[#1d1d1d] p-4 text-white">
      <div className="w-full h-full relative">
        {/* Participant A */}
        <div
          className={`flex flex-col gap-2 items-center justify-center ${pinned === "A"
              ? "bg-neutral-900 w-full h-full"
              : "bg-neutral-900 w-[30%] md:w-[300px] md:aspect-video aspect-[2/3] m-2 z-10"
            } rounded-md overflow-hidden absolute top-0 group`}
        >
          {videoOn ? (
            <video
              ref={localVideoRef}
              autoPlay
              muted
              className="w-full h-full bg-black"
            />
          ) : (
            <div className="w-36 h-36 bg-gray-600 rounded-full"></div>
          )}
          <p className={`absolute bottom-1 left-2 ${pinned === 'A' ? 'text-xl font-semibold ' : 'text-md text-white translate-y-6 group-hover:-translate-y-0 duration-300'} `}>Shruti Ked</p>
          <div className={`absolute top-1 right-2 ${pinned === 'A' ? 'hidden' : '-translate-y-6 translate-x-6 group-hover:-translate-y-0 group-hover:translate-x-0 duration-300'} `}
          onClick={() => setPinned("A")}>
            <Pin size={18} strokeWidth={1.25} className="rotate-45" />
          </div>
        </div>


        <div
          className={`flex flex-col gap-2 items-center justify-center overflow-hidden group ${pinned === "B"
              ? "bg-neutral-400 w-full h-full"
              : "bg-neutral-400 w-[300px] h-[200px] m-2 z-10"
            } rounded-md absolute top-0`}
        >
          <video
            ref={remoteVideoRef}
            autoPlay
            muted
            className="w-36 h-36 rounded-full bg-black"
          />
          <p className={`absolute bottom-1 left-2 ${pinned === 'B' ? 'text-xl font-semibold ' : 'text-md text-white translate-y-6 group-hover:-translate-y-0 duration-300'} `}>Shruti Ked</p>
          <div className={`absolute top-1 right-2 ${pinned === 'B' ? 'hidden' : '-translate-y-6 translate-x-6 group-hover:-translate-y-0 group-hover:translate-x-0 duration-300'} `}
          onClick={() => setPinned("B")}>
            <Pin size={18} strokeWidth={1.25} className="rotate-45" />
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex gap-3 absolute bottom-6 left-[50%] -translate-x-[50%]">
        {/* Mic Toggle */}
        <button
          onClick={handleMicToggle}
          className={`px-5 py-2 ${micOn ? "bg-gray-500 " : "bg-gray-700 "
            } opacity-30 h-fit w-fit rounded-md`}
        >
          {micOn ? <Mic size={32} strokeWidth={2.25} /> : <MicOff size={32} strokeWidth={2.25} />}
        </button>

        {/* End Call */}
        <button
          onClick={handleEndCall}
          className="px-5 py-2 bg-red-500 h-fit w-fit rounded-md"
        >
          <Phone size={32} strokeWidth={2.25} className="rotate-[135deg]" />
        </button>

        {/* Video Toggle */}
        <button
          onClick={handleVideoToggle}
          className={`px-5 py-2 ${videoOn ? "bg-gray-500 " : "bg-gray-700 "
            } opacity-50 h-fit w-fit rounded-md opacity-30`} >
          {videoOn ? <Video size={32} strokeWidth={2.25} /> : <VideoOff size={32} strokeWidth={2.25} />}
        </button>
      </div>
    </div>
  );
};

export default VideoCallInterface;
