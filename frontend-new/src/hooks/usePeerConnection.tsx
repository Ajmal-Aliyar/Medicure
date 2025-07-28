import { ICE_SERVERS } from "@/types/consult";
import { useRef } from "react";

interface Props {
    localVideoRef: React.RefObject<HTMLVideoElement> | any,
    remoteVideoRef: React.RefObject<HTMLVideoElement> | any,
    videoOn: boolean,
    audioOn: boolean
    onIceCandidate: (candidate: RTCIceCandidate, remoteSocketId: string) => void
}
export const usePeerConnection = ({ audioOn, videoOn, localVideoRef, onIceCandidate, remoteVideoRef }: Props) => {
    const peerConnection = useRef<RTCPeerConnection | null>(null);


    const initPeerConnection = async (remoteUserId: string): Promise<boolean> => {
        try {
            peerConnection.current = new RTCPeerConnection({
                iceServers: ICE_SERVERS,
            });
            peerConnection.current.onicecandidate = (event) => {
                console.log('candidate checking....')
                if (event.candidate) {
                    onIceCandidate(event.candidate, remoteUserId);
                }

            };
            peerConnection.current.ontrack = (event) => {
                const [stream] = event.streams;
                if (remoteVideoRef.current) {
                    remoteVideoRef.current.srcObject = stream;
                    remoteVideoRef.current.onloadedmetadata = () => {
                        remoteVideoRef.current?.play().catch((err: unknown) => {
                            console.error("Video play error", err);
                        });
                    };
                }
            };

            let localStream: MediaStream;
            try {
                localStream = await navigator.mediaDevices.getUserMedia({
                    video: videoOn,
                    audio: audioOn,
                });
            } catch (err) {
                console.error("❌ getUserMedia failed in incognito:", err);
                alert("Unable to access camera/mic. Please allow permissions or check browser settings.");
                return false;
            }
            if (localVideoRef.current) {
                localVideoRef.current.srcObject = localStream;
            }
            localStream.getTracks().forEach((track) => {
                peerConnection.current?.addTrack(track, localStream);
            });
            return true;
        } catch (err) {
            console.error("Error accessing media devices or setting up peer connection", err);
            return false;
        }
    };

    const peer = () => peerConnection.current;


    const clearRemoteStream = () => {
        if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = null;
        }
    };

    const closeConnection = () => {
        clearRemoteStream();
        peerConnection.current?.close();
        peerConnection.current = null;
    };

    return {
        initPeerConnection,
        peer,
        closeConnection,
    };
};

