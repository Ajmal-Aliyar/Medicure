import crypto from "crypto";

export function generateRoomId(): string {
  const timestamp = Date.now(); 
  const randomStr = crypto.randomBytes(3).toString("hex").toUpperCase(); 
  return `ROOM-${timestamp}-${randomStr}`;
}
