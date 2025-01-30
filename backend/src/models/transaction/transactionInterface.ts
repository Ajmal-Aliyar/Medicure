import mongoose from "mongoose";

export interface ITransaction extends Document {
    transactionID: mongoose.Types.ObjectId;
    patientId: mongoose.Types.ObjectId;
    doctorId: mongoose.Types.ObjectId;
    amount: number;
    status: string;
    transactionDate: Date;
  }