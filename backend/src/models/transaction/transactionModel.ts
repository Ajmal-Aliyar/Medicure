import mongoose from "mongoose";
import { ITransaction } from "./transactionInterface";
import { transactionSchema } from "./transactionSchema";



export const TransactionModel = mongoose.model<ITransaction>('transaction', transactionSchema);


