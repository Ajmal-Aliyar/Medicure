import { createContext } from 'react';
import ChatWindow from '../../components/common/chat/ChatWindow'
import SideBar from '../../components/common/chat/SideBar'
import { ChatContextType } from '../../types/chat/ChatType';

export const ChatContext = createContext<ChatContextType | undefined>(undefined);

const Chat = () => {

  return (
    <div className='bg-gray-100  rounded-md overflow-hidden shadow-lg flex-1 flex'>
      <SideBar />
      <ChatWindow />
    </div>
  )
}

export default Chat
