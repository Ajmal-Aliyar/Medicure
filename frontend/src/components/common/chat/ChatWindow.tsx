import { Send } from 'lucide-react'
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { addMessage } from '../../../store/slices/commonSlices/chatSlice';
import { sendMessageApi } from '../../../sevices/chat/fetchMessage';
import { IMessage } from '../../../types/chat/ChatType';
import { markAsReadApi } from '../../../sevices/chat/fetchChats';

const ChatWindow = () => {
    const [message, setMessage] = useState('');
    const { selectedChat } = useSelector((state: RootState) => state.chat);
    const userId = useSelector((state: RootState) => state.auth._id)
    const dispatch = useDispatch()

     const bottomRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        const MarkAsRead = async (chatId: string) => {
            await markAsReadApi(chatId)
        }
        selectedChat?.chatId && MarkAsRead(selectedChat.chatId)
    }, [selectedChat]);

    if (!selectedChat)
        return (
            <div className="flex-grow flex flex-col h-full bg-white justify-center items-center">
                <div className="max-w-md p-6 text-center">
                    <h2 className="text-2xl font-bold text-gray-800">Welcome to the Chat Section</h2>
                    <p className="mt-2 text-gray-600">
                        Select a conversation from the sidebar to start chatting. 🚀
                    </p>
                </div>
            </div>
        );
    

    const sendMessage = async () => {
        if (message.trim()) {
            await sendMessageApi(message, userId, selectedChat.chatId);
            dispatch(addMessage({ content: message, senderId: userId, chatId: selectedChat.chatId }));
            setMessage('');
        }
    };
    return (
        <div className="flex-grow flex flex-col h-full">

            <div className="p-4 bg-white flex justify-between items-center border-b border-gray-300 h-[80px]">
                <div className="flex items-center">
                    <div className="mr-4 flex">
                        <img src={selectedChat.profileImage} className='max-w-[40px] rounded-full border-2 border-gray-400' />
                    </div>
                    <div>
                        <h2 className="font-semibold">{selectedChat?.name}</h2>
                        <p className="text-xs text-gray-500">Online</p>
                    </div>
                </div>
            </div>

            <div className="flex-grow bg-gray-100 p-4 overflow-y-auto">
            {selectedChat.messages.map((msg: IMessage) => (
                <div
                    key={msg._id}
                    className={`flex mb-4 ${msg.senderId === userId ? "justify-end" : "justify-start"}`}
                >
                    {msg.senderId !== userId && (
                        <img src={selectedChat.profileImage} className="max-w-[30px] rounded-full mr-2" alt="" />
                    )}
                    <div
                        className={`px-3 py-1  rounded-xl max-w-md h-fit ${
                            msg.senderId === userId ? "bg-[#93cdf990] text-right rounded-br-none" : "bg-white text-left rounded-bl-none "
                        }`}
                    >
                        {msg.content}
                    </div>
                </div>
            ))}
            <div ref={bottomRef} />
        </div>

            <div className="p-4 bg-white flex items-center space-x-4">
                <input
                    placeholder="Type a message"
                    className="flex-grow outline-none"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button
                    className="text-[#51aff6]"
                    onClick={sendMessage}
                >
                    <Send />
                </button>
            </div>
        </div>
    )
}

export default ChatWindow
