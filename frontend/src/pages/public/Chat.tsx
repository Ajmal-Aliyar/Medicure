import { createContext } from 'react';
import ChatWindow from '../../components/common/chat/ChatWindow'
import SideBar from '../../components/common/chat/SideBar'
import { ChatContextType } from '../../types/chat/ChatType';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export const ChatContext = createContext<ChatContextType | undefined>(undefined);

const Chat = () => {

  useGSAP(() => {
    const tl = gsap.timeline();
  
    tl.from(".box", {
        opacity:0,
        y:50,
        stagger:0.1,
        delay: '0.7'
    }, '-=0.8');
  });

  return (
    <div className='box bg-gray-100  rounded-md overflow-hidden shadow-lg flex-1 flex'>
      <SideBar />
      <ChatWindow />
    </div>
  )
}

export default Chat
