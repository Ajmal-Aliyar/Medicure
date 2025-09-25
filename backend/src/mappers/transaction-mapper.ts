import { TransactionDetailsDTO } from "@/dtos";
import { ITransaction } from "@/models";
import { findTransactionDirection } from "@/utils";

export class TransactionMapper {
    static toTransaction( id: string, transactions: ITransaction[]): TransactionDetailsDTO[] {
       return transactions.map((transaction) => ({
        id: String(transaction._id),
        amount: transaction.amount,
        createdAt: transaction.createdAt,
        type: transaction.type,
        direction: findTransactionDirection( transaction, id ),
        ...(transaction.doctorId !== undefined && {doctorId: String(transaction.doctorId)})
       }))
    }
}
