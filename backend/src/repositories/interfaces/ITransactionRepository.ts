import { InferSchemaType } from "mongoose";
import { transactionSchema } from "../../models/transaction/transactionSchema";


export type ITransactionDocument = InferSchemaType<typeof transactionSchema>;

export interface ITransactionRepository {

}