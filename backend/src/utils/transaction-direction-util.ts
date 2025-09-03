import { ITransaction } from "@/models";

export const findTransactionDirection = (transaction: ITransaction, id: string): "debit" | "credit" => {
   if(transaction.from.toString() === id) return "debit";
   if(transaction.to.toString() === id) return "credit";
   if(transaction.type === "appointment" && transaction.doctorId?.toString() === id) return "credit"
   if(transaction.type === "withdraw" && transaction.doctorId?.toString() === id) return "debit"
   return "debit"
}

export function generateTransactionId(): string {
  const now = new Date();
  const timestamp = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
    String(now.getHours()).padStart(2, "0"),
    String(now.getMinutes()).padStart(2, "0"),
    String(now.getSeconds()).padStart(2, "0"),
  ].join("");

  const random = Math.floor(100000 + Math.random() * 900000);

  return `TXN-${timestamp}-${random}`;

}