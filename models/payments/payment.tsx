import mongoose, { Document } from "mongoose";

export interface PaymentDocument extends Document {
  paymentStatus: string;
  createdAt: any;
  payment_Info: {
    id: string;
    status: string;
    subscription: string;
    paidAt: Date;
  };
}

const paymentSchemma = new mongoose.Schema({
  payment_Info: {
    id: { type: String, require: true },
    status: { type: String, require: true },
    subscription: { type: String, require: true },
    paidAt: { type: Date, require: true },
  },

  creatdAt: { type: Date, default: Date.now },
});

const Payment =
  mongoose.models.Payment ||
  mongoose.model<PaymentDocument>("Payment", paymentSchemma);

export default Payment;
