import mongoose, { Document, Schema } from 'mongoose';

export interface ITransaction extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    amount: number;
    date: Date;
    type: 'income' | 'expense';
    note: string;
}

const TransactionSchema: Schema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    type: { type: String, enum: ['income', 'expense'], required: true },
    note: { type: String }
});

export default mongoose.model<ITransaction>('Transaction', TransactionSchema);
