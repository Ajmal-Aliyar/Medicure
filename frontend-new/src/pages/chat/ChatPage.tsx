import InputWithIcon from "@/components/ui/InputWithIcon";
import { Boxes, ChevronLeft, MessageCircle, Plus, Search, UserPlus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatUserList from "./components/ChatUserList";
import ChatRequestList from "./components/ChatRequestList";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import type { IRole } from "@/types/auth";
import ChatWindow from "./components/ChatWindow";


const ChatPage = () => {
  const {user} = useSelector((state: RootState) => state.auth)
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [tab, setTab] = useState<"chat" | "requests" | "broadcast">("chat");

  const navigate = useNavigate()



 

  return (
    <>
      <div className="col-span-2 bg-white flex flex-col border-r border-border">
        <div className="p-3 gap-2 items-center bg-white flex border-border border-b">
            <ChevronLeft className="text-primary bg-white outline rounded-md p-1 cursor-pointer"
            onClick={() => navigate(-1)}
            size={30} />
          <InputWithIcon
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search Doctor..."
            icon={<Search className="w-4 h-4 text-primary" />}
            className="w-full h-fit z-10 text-primary border-0 outline"
          />
          <Plus
            className="text-primary bg-white outline rounded-md p-1 cursor-pointer"
            size={30}
          />
        </div>
        <div className="w-full h-full flex">
          <div className="w-24 border-r border-border h-full flex flex-col items-center py-4 gap-5 text-primary">
            <div
              className={`hover:bg-primary-light hover:text-white rounded-md p-2 cursor-pointer ${tab === "chat" ? "bg-primary-light text-white" : ""}`}
              onClick={() => setTab("chat")}
            >
              <MessageCircle />
            </div>
            <div
              className={`hover:bg-primary-light hover:text-white rounded-md p-2 cursor-pointer ${tab === "requests" ? "bg-primary-light text-white" : ""}`}
              onClick={() => setTab("requests")}
            >
              <UserPlus />
            </div>
            <div
              className={`hover:bg-primary-light hover:text-white rounded-md p-2 cursor-pointer ${tab === "broadcast" ? "bg-primary-light text-white" : ""}`}
              onClick={() => setTab("broadcast")}
            >
              <Boxes />
            </div>
          </div>
            {tab === "chat" && <ChatUserList id={user?.id as string} role={user?.role as IRole} /> }
             {tab === "requests" && <ChatRequestList role={user?.role as IRole} />}
        </div>
      </div>

      <ChatWindow senderId={user?.id as string} senderName={user?.fullName as string} role={user?.role as IRole}/>
    </>
  );
};

export default ChatPage;
