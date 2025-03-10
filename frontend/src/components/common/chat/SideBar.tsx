import { Search } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { setChats, setSelectedChat } from '../../../store/slices/commonSlices/chatSlice';
import { fetchMessagesApi } from '../../../sevices/chat/fetchMessage';
import { useEffect } from 'react';
import { fetchChatsApi } from '../../../sevices/chat/fetchChats';
import { joinChat } from '../../../utils/wss';

const SideBar = () => {
    const userId = useSelector((state: RootState) => state.auth._id);
    const { chats, selectedChat } = useSelector((state: RootState) => state.chat);
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchChats = async () => {
            const { data } = await fetchChatsApi(userId)
            console.log(data)
            dispatch(setChats(data || []))
        }

        fetchChats()
    }, [])


    const selectChat = async (chatId: string, profileImage: string, name: string) => {
        try {
            joinChat(chatId)
            const messages = await fetchMessagesApi(chatId)
            dispatch(setSelectedChat({ chatId, messages, profileImage, name }));
            console.log('selected chat', chatId, name)
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    return (
        <div className="w-80 border-r border-gray-300 flex flex-col">
            <div className="p-3 bg-[#51aff6a1] flex justify-between items-center">
            
                <div className="relative w-full">
                    <Search className="absolute left-3 top-2 text-white" size={20} />
                    <input
                        placeholder="Search..."
                        className="pl-10 border rounded-md w-full border-white outline-none p-1 placeholder:text-white"
                    />
                </div>
            </div>

            <div className="flex-grow overflow-y-auto">
                {chats.length === 0 ? (
                    <p>No chats available</p>
                ) : (
                    <ul>
                        {chats.map((chat: any) => (
                            <div
                                key={chat._id}
                                className={`p-4 flex items-center hover:bg-gray-200 cursor-pointer ${selectedChat?.chatId === chat._id ? 'bg-gray-200' : ''}`}
                                onClick={() => selectChat(chat._id, chat?.participants[0].profileImage, chat.participants[0].fullName)}
                            >
                                <div className="mr-4">
                                    <img src={chat?.participants[0].profileImage} className='max-w-[40px] rounded-full border-2 border-gray-400' />
                                </div>

                                <div className="flex-grow">
                                    <div className="flex justify-between">
                                        <span className="font-semibold">
                                            {chat.isGroup
                                                ? chat.groupName
                                                : `${chat.participants[0].fullName}`}

                                        </span>
                                        <span className="text-xs text-gray-400">12:30 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="text-sm text-gray-600 truncate">{chat?.lastMessage}</p>
                                        {chat?.unreadCount >= 0 && (
                                            <span className="bg-green-500 text-white rounded-full px-2 py-0.5 text-xs">
                                                {chat?.unreadCount}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default SideBar

