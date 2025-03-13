import SideBar from "../../components/admin/chat/SideBar"
import ChatWindow from "../../components/common/chat/ChatWindow"



const Message = () => {
  return (
    <div className='bg-gray-100  rounded-md overflow-hidden shadow-lg flex-1 flex'>
        <SideBar />
      <ChatWindow />
    </div>
  )
}

export default Message
