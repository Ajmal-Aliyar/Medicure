// ChatPage.tsx
import { DEFAULT_IMAGE } from "@/app/constants";
import InputWithIcon from "@/components/ui/InputWithIcon";
import { formatTo12HourTime } from "@/utils/formatDate";
import { Boxes, MessageCircle, Plus, Search, UserPlus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
// import { socket } from "@/lib/socket";

interface Message {
  senderId: string;
  text: string;
  timestamp: Date;
}

const ChatPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [tab, setTab] = useState<"chat" | "requests" | "broadcast">("chat");
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // socket.connect();
    // socket.on("receive_message", (message: Message) => {
    //   setMessages((prev) => [...prev, message]);
    // });

    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const message: Message = {
      senderId: "user123", // replace with actual user id
      text: newMessage,
      timestamp: new Date(),
    };
    // socket.emit("send_message", message);
    setMessages((prev) => [...prev, message]);
    setNewMessage("");
  };

  return (
    // <div className="grid grid-cols-3 h-screen">
    <>
      <div className="col-span-2 bg-white flex flex-col border-r border-border">
        <div className="p-3 gap-2 items-center bg-white flex border-border border-b">
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
          <div className="flex flex-col w-full overflow-y-auto ">
            {tab === "chat" && (
                <>
              <div className="flex p-4 gap-4 border-b py-3 border-border cursor-pointer">
                <img
                  src={DEFAULT_IMAGE}
                  className="w-12 h-12 rounded-full shadow"
                  alt="profile"
                />
                <div className="flex flex-col w-full mt-1">
                  <p className="text-secondary font-medium text-md">
                    Dr. APJ AbdulKalam
                  </p>
                  <p className="text-xs text-muted">
                    {searchQuery.length > 15
                      ? `${searchQuery.slice(0, 15)}.....`
                      : searchQuery}
                  </p>
                </div>
                <div className="mt-2 text-right">
                  <p className="text-secondary font-medium text-xs">
                    {formatTo12HourTime(new Date())}
                  </p>
                  <div className="w-4 h-4 ml-auto mt-1 bg-primary rounded-full flex items-center justify-center text-xs text-white">
                    1
                  </div>
                </div>
              </div>
              <div className="flex p-4 gap-4 border-b py-3 border-border cursor-pointer">
                <img
                  src={DEFAULT_IMAGE}
                  className="w-12 h-12 rounded-full shadow"
                  alt="profile"
                />
                <div className="flex flex-col w-full mt-1">
                  <p className="text-secondary font-medium text-md">
                    Dr. APJ AbdulKalam
                  </p>
                  <p className="text-xs text-muted">
                    {searchQuery.length > 15
                      ? `${searchQuery.slice(0, 15)}.....`
                      : searchQuery}
                  </p>
                </div>
                <div className="mt-2 text-right">
                  <p className="text-secondary font-medium text-xs">
                    {formatTo12HourTime(new Date())}
                  </p>
                  <div className="w-4 h-4 ml-auto mt-1 bg-primary rounded-full flex items-center justify-center text-xs text-white">
                    1
                  </div>
                </div>
              </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="col-span-3 flex flex-col bg-background">
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((msg, idx) => (
            <div key={idx} className={`mb-2 w-fit max-w-xs px-4 py-2 rounded-lg text-sm ${msg.senderId === "user123" ? "bg-primary text-white ml-auto" : "bg-white text-secondary"}`}>
              <p>{msg.text}</p>
              <p className="text-[10px] text-muted mt-1 text-right">
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
        </div>
      </div>
    {/* </div> */}
    </>
  );
};

export default ChatPage;
