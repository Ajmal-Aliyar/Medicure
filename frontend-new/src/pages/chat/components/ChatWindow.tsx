import type { RootState } from "@/app/store";
import { adminMessageService } from "@/services/api/admin/message";
import { doctorMessageService } from "@/services/api/doctor/message";
import { patientMessageService } from "@/services/api/patient/message";
import socket from "@/sockets";
import type { IRole } from "@/types/auth";
import type { IMessage, IMessageService } from "@/types/message";
import { SOCKET_EVENTS } from "@/types/socket";
import { formatTo12HourTime } from "@/utils/formatDate";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

interface Props {
    senderId: string;
    senderName: string;
    role: IRole;
}

interface SendMessage extends IMessage {
    senderName: string;
}
const ChatWindow = ({ senderId, senderName, role }: Props) => {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [newMessage, setNewMessage] = useState<string>("");
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const messagesContainerRef = useRef<HTMLDivElement | null>(null);
    const { chat } = useSelector((state: RootState) => state.chat);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const services: Record<IRole, IMessageService> = {
        patient: patientMessageService,
        doctor: doctorMessageService,
        admin: adminMessageService,
    };

    const fetchMessages = async (requestedPage: number, append = false) => {
        if (!chat?._id || !services[role] || isLoading) return;
        setIsLoading(true);

        try {
            const { data, meta } = await services[role].getMessages(chat._id, requestedPage);
            const reversed = data.reverse();

            setMessages(prev => append ? [...prev, ...reversed] : [...reversed, ...prev]);
            setPage(meta.page);
            setHasMore(meta.totalPages > meta.page);
        } catch (err) {
            console.error("Error fetching messages:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!chat?._id) return;

        const handleReceiveMessage = ({ message }: { message: IMessage }) => {
            setMessages(prev => [...prev, message]);
        };

        socket.on(SOCKET_EVENTS.CHAT.RECEIVE_MESSAGE, handleReceiveMessage);
        fetchMessages(1); 

        return () => {
            socket.off(SOCKET_EVENTS.CHAT.RECEIVE_MESSAGE, handleReceiveMessage);
        };
    }, [chat?._id, role]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        const container = messagesContainerRef.current;
        if (!container) return;

        const handleScroll = async () => {
            if (container.scrollTop === 0 && hasMore && !isLoading) {
                const prevScrollHeight = container.scrollHeight;
                await fetchMessages(page + 1);

                requestAnimationFrame(() => {
                    const newScrollHeight = container.scrollHeight;
                    container.scrollTop = newScrollHeight - prevScrollHeight;
                });
            }
        };

        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
    }, [page, hasMore, isLoading, chat?._id, role]);

    const sendMessage = () => {
        if (!newMessage.trim() || !chat?._id) return;

        const message: SendMessage = {
            conversationId: chat._id,
            senderId,
            content: newMessage,
            createdAt: String(new Date()),
            senderName: chat?.isGroup ? chat.name as string : senderName
        };

        const participants = chat?.members.map(participant => participant.id);

        socket.emit(SOCKET_EVENTS.CHAT.SEND_MESSAGE, {
            senderId, participants, message
        });

        setMessages((prev) => [...prev, message]);
        setNewMessage("");
    };

    return (
        <div className="col-span-3 flex flex-col h-screen bg-background">
            {chat ? (
                <>
                    <div
                        ref={messagesContainerRef}
                        className="flex-1 overflow-y-auto px-4 py-2 space-y-2"
                    >
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`mb-2 w-fit max-w-xs px-4 py-2 rounded-lg text-sm ${msg.senderId === senderId
                                        ? "bg-primary-light ml-auto"
                                        : "bg-white"
                                    } text-secondary`}
                            >
                                <p>{msg.content}</p>
                                <p className="text-[10px] text-muted-dark mt-1 text-right">
                                    {msg.createdAt && formatTo12HourTime(new Date(msg.createdAt))}
                                </p>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="p-4 border-t border-border flex gap-2 bg-white">
                        <input
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                            className="flex-1 px-4 py-2 border border-border rounded-full text-sm focus:outline-none"
                            placeholder="Type your message..."
                        />
                        <button
                            onClick={sendMessage}
                            className="px-4 py-2 bg-primary text-white rounded-full text-sm"
                        >
                            Send
                        </button>
                    </div>
                </>
            ) : (
                <div className="flex-1 flex items-center justify-center">
                    <p className="text-muted">No chat selected</p>
                </div>
            )}
        </div>
    );
};


export default ChatWindow