import type { RootState } from "@/app/store";
import socket from "@/sockets";
import { SOCKET_EVENTS } from "@/types/socket";
import { formatTo12HourTime } from "@/utils/formatDate";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
interface Message {
    conversationId: string;
    senderId: string;
    text: string;
    timestamp: Date;
    senderName: string
}
interface Props {
    senderId: string;
    senderName: string;
}
const ChatWindow = ({ senderId, senderName }: Props) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState<string>("");
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const { chat } = useSelector((state: RootState) => state.chat)

    useEffect(() => {
        const handleReceiveMessage = ({ message }: { message: Message }) => {
            setMessages((prev) => [...prev, message]);
        };

        const fetchMessages = async () => {
            
        }

        socket.on(SOCKET_EVENTS.CHAT.RECEIVE_MESSAGE, handleReceiveMessage);
        fetchMessages()
        return () => {
            socket.off(SOCKET_EVENTS.CHAT.RECEIVE_MESSAGE, handleReceiveMessage);
        };
    }, [])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = () => {
        if (!newMessage.trim()) return;
        const message: Message = {
            conversationId: chat?._id as string,
            senderId,
            text: newMessage,
            timestamp: new Date(),
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
        <div className="col-span-3 flex flex-col bg-background">
            {chat ? <>
                <div className="flex-1 p-4 overflow-y-auto">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`mb-2 w-fit max-w-xs px-4 py-2 rounded-lg text-sm ${msg.senderId === senderId ? "bg-primary-light ml-auto" : "bg-white "} text-secondary`}>
                            <p>{msg.text}</p>
                            <p className="text-[10px] text-muted-dark mt-1 text-right">
                                {formatTo12HourTime(new Date(msg.timestamp))}
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
                </div></> : <div>
                no chat selected
            </div>}
        </div>
    )
}

export default ChatWindow