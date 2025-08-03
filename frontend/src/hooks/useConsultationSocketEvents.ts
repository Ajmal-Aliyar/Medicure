import socket from "@/sockets";
import { SOCKET_EVENTS } from "@/types/socket";
import { useEffect } from "react";

interface Props {
  handleRemoteJoin: (socketId: string) => void;
  onOfferReceived: (offer: RTCSessionDescriptionInit, from: string) => void;
  onAnswerReceived: (answer: RTCSessionDescriptionInit) => void;
  addIceCandidate: (candidate: RTCIceCandidateInit) => void;
}

export const useConsultationSocketEvents = ({
  handleRemoteJoin,
  onOfferReceived,
  onAnswerReceived,
  addIceCandidate,
}: Props) => {
  useEffect(() => {
    socket.on(SOCKET_EVENTS.CONSULT.JOINED_ROOM, ({ socketId }) => {
      handleRemoteJoin(socketId);
    });

    socket.on(SOCKET_EVENTS.CONSULT.OFFER, ({ offer, from }) => {
      onOfferReceived(offer, from);
    });

    socket.on(SOCKET_EVENTS.CONSULT.ANSWER, ({ answer }) => {
      onAnswerReceived(answer);
    });

    socket.on(SOCKET_EVENTS.CONSULT.ICE_CANDIDATE, ({ candidate }) => {
      if (candidate) addIceCandidate(candidate);
    });

    return () => {
      socket.off(SOCKET_EVENTS.CONSULT.JOINED_ROOM);
      socket.off(SOCKET_EVENTS.CONSULT.OFFER);
      socket.off(SOCKET_EVENTS.CONSULT.ANSWER);
      socket.off(SOCKET_EVENTS.CONSULT.ICE_CANDIDATE);
    };
  }, []);
};
