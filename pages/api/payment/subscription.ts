import connectDatabase from "@mongo/database";
import Payment from "@models/payments/payment";
import { NextApiRequest, NextApiResponse } from "next";
export default async function connectMongo(
  req: NextApiRequest,
  res: NextApiResponse
) {
  connectDatabase();

  const { id, status, subscription } = req.body.payment.payment_Info;

  let payment = await Payment.create({
    payment_Info: { id, status, subscription },
  });
  res.json({ payment });
}
