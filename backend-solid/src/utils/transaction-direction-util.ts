import { ITransaction } from "@/models";

export const findTransactionDirection = (transaction: ITransaction, id: string): "debit" | "credit" => {
   if(transaction.from.toString() === id) return "debit";
   if(transaction.to.toString() === id) return "credit";
   if(transaction.type === "appointment" && transaction.doctorId?.toString() === id) return "credit"
   if(transaction.type === "withdraw" && transaction.doctorId?.toString() === id) return "debit"
   return "debit"
}