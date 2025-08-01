import { DEFAULT_IMAGE } from "@/app/constants";
import { Pagination } from "@/components/ui/Pagination";
import { adminConversationService } from "@/services/api/admin/conversation";
import { doctorConversationService } from "@/services/api/doctor/conversation";
import { patientConversationService } from "@/services/api/patient/conversation";
import { selectChat } from "@/slices/chatSlice";
import socket from "@/sockets";
import type { IRole } from "@/types/auth";
import type { IConversationDetails, IConversationService } from "@/types/conversation";
import { SOCKET_EVENTS } from "@/types/socket";
import { formatTo12HourTime } from "@/utils/formatDate";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";

interface Props {
  id: string;
  role: IRole;
}

const ChatUserList = ({ id, role }: Props) => {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [conversations, setConversations] = useState<IConversationDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch()

  const service: IConversationService = useMemo(() => {
    return {
      patient: patientConversationService,
      doctor: doctorConversationService,
      admin: adminConversationService,
    }[role];
  }, [role]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setLoading(true);
        const { data, meta } = await service.getConversations(page);
        setConversations(data);
        setTotalPage(meta.totalPages);
        setError(null);
      } catch {
        setError("Failed to load conversations.");
      } finally {
        setLoading(false);
      }
    };

        socket.on(SOCKET_EVENTS.CHAT.LAST_MESSAGE, ({ message }) => {
  setConversations(prev =>
    prev.map(conversation =>
      conversation._id.toString() === message.conversationId.toString()
        ? {
            ...conversation,
            lastMessage: {
              ...conversation.lastMessage, 
              message: message.content,
              date: message.createdAt,
            },
          }
        : conversation
    )
  );
});


    fetchConversations();
  }, [page, service]);

  const getOtherMember = (members: IConversationDetails["members"]): typeof members[number] => {
    return members.find((m) => m.id !== id) || members[0];
  };

  if (loading) {
    return <div className="p-4 text-center text-sm text-muted">Loading conversations...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-sm text-red-500">{error}</div>;
  }

  if (!conversations.length) {
    return <div className="p-4 text-center text-sm text-muted">No conversations found.</div>;
  }

  return (
    <div className="flex flex-col w-full overflow-y-auto">
      {conversations.map((chat) => {
        const otherMember = getOtherMember(chat.members);

        return (
          <div
            key={chat._id}
            className="flex p-4 gap-4 border-b py-3 border-border cursor-pointer hover:bg-muted/20"
            onClick={() => dispatch(selectChat({ chat }))}
          >
            <img
              src={
                chat.isGroup
                  ? chat.groupImageUrl || DEFAULT_IMAGE
                  : otherMember.profileImage || DEFAULT_IMAGE
              }
              className="w-12 h-12 rounded-full shadow"
              alt="Profile"
            />
            <div className="flex flex-col w-full mt-1">
              <p className="text-secondary font-medium text-md truncate">
                {chat.isGroup ? chat.name || "Unnamed Group" : otherMember.fullName}
              </p>
              <p className="text-xs text-muted truncate">
                {chat.lastMessage.message.length > 16 ? `${chat.lastMessage.message.slice(0,16)}...` : chat.lastMessage.message}
              </p>
            </div>
            <div className="mt-2 text-right">
              <p className="text-secondary font-medium text-xs">
                {chat.lastMessage.date && formatTo12HourTime(chat.lastMessage.date)}
              </p>
              {/* <div className="w-4 h-4 ml-auto mt-1 bg-primary rounded-full flex items-center justify-center text-[10px] text-white">
                1
              </div> */}
            </div>
          </div>
        );
      })}
      {totalPage > 1 && <Pagination currentPage={page} onPageChange={setPage} totalPages={totalPage} />}
    </div>
  );
};

export default ChatUserList;
