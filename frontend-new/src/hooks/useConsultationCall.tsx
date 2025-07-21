import { useEffect, useState } from "react";
import { usePeerConnection } from "./usePeerConnection";
import { SOCKET_EVENTS } from "@/types/socket";
import socket from "@/sockets";

interface Props {
    userId: string;
    remoteUserId: string;
    patientId: string;
    roomId: string;
    localVideoRef: React.RefObject<HTMLVideoElement | null>;
    remoteVideoRef: React.RefObject<HTMLVideoElement | null>;
    videoOn: boolean;
    audioOn: boolean;
}

export const useConsultationCall = ({
    userId,
    remoteUserId,
    patientId,
    roomId,
    localVideoRef,
    remoteVideoRef,
    videoOn,
    audioOn
}: Props) => {
    const [callStarted, setCallStarted] = useState(false);

    useEffect(() => {
        remoteUserId && initPeerConnection(remoteUserId)
        return () => {
            if (localVideoRef.current?.srcObject instanceof MediaStream) {
                localVideoRef.current.srcObject.getTracks().forEach((track: any) => track.stop());
            }
            onClose();
        };

    }, [remoteUserId, roomId])

    const onIceCandidate = (candidate: RTCIceCandidate, remoteSocketId: string) => {
        socket.emit(SOCKET_EVENTS.CONSULT.ICE_CANDIDATE, {
            to: remoteSocketId,
            candidate
        });
    };

    const { peer, initPeerConnection, closeConnection } = usePeerConnection({ localVideoRef, remoteVideoRef, videoOn, audioOn, onIceCandidate });

    const join = async () => {
        const success = await initPeerConnection(remoteUserId);
        if (!success) return;
        socket.emit(SOCKET_EVENTS.CONSULT.JOIN_ROOM, { roomId, candidateId: userId, patientId });
        setCallStarted(true);
    };

    const handleRemoteJoin = (otherSocketId: string) => {
        peer()?.createOffer()
            .then((offer) => {
                peer()?.setLocalDescription(offer);
                console.log('offer sended', offer)
                socket.emit(SOCKET_EVENTS.CONSULT.OFFER, {
                    offer,
                    to: otherSocketId,
                });
            });
    }


    const onOfferReceived = (offer: RTCSessionDescriptionInit, from: string) => {
        peer()?.setRemoteDescription(offer);
        peer()
            ?.createAnswer()
            .then((answer) => {
                peer()?.setLocalDescription(answer);
                socket.emit(SOCKET_EVENTS.CONSULT.ANSWER, {
                    answer,
                    to: from,
                });
            });
    };

    const onAnswerReceived = async (answer: RTCSessionDescriptionInit) => {
        await peer()?.setRemoteDescription(
            new RTCSessionDescription(answer)
        );
    }

    const addIceCandidate = (candidate: RTCIceCandidateInit) => {
        if (candidate) {
            peer()?.addIceCandidate(new RTCIceCandidate(candidate));
        }
    }

    const onClose = () => {
        closeConnection()
        setCallStarted(false)
    }

    return {
        callStarted, setCallStarted,
        join,
        handleRemoteJoin,
        onOfferReceived,
        onAnswerReceived,
        addIceCandidate,
        onClose,
    };
};
