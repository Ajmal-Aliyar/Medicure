import { Button } from "@/components/ui/Button";
import { MessageSquare, Link } from "lucide-react";

interface ConnectionButtonProps {
  status: "connected" | "request_sent" | "not_connected";
  onSendMessage: () => void;
  onSendRequest: () => void;
}

export function ConnectionButton({
  status,
  onSendMessage,
  onSendRequest,
}: ConnectionButtonProps) {
  const variant =
    status === "connected"
      ? "primary"
      : status === "request_sent"
      ? "muted"
      : "outline";

  const onClick =
    status === "connected"
      ? onSendMessage
      : status === "request_sent"
      ? undefined
      : onSendRequest;

  const icon =
    status === "connected" ? (
      <MessageSquare className="mt-1" />
    ) : (
      <Link className="mt-1" />
    );

  const label =
    status === "connected"
      ? "Message"
      : status === "request_sent"
      ? "Request Sent"
      : "Connect";

  return (
    <Button
      variant={variant}
      className={`flex-1 py-2 flex items-center justify-center gap-1 ${
        status === "request_sent" ? "active:scale-100" : ""
      }`}
      onClick={onClick}
    >
      {icon}
      {label}
    </Button>
  );
}
