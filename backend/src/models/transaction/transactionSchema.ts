import mongoose, { Schema } from 'mongoose';
import { ITransaction } from './transactionInterface';



export const transactionSchema = new Schema<ITransaction>({
  transactionID: {
    type: Schema.Types.ObjectId,
    required: true,
    default: () => new mongoose.Types.ObjectId(),
  },
  patientId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  doctorId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['success', 'failed', 'pending'],
    required: true,
  },
  transactionDate: {
    type: Date,
    required: true,
    default: Date.now
  },
});

