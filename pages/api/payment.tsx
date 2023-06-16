import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15", // Replace with the desired API version
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amountRupee,
        currency: "Inr",
        metadata: {
          company: "NETFLIXCLONE",
        },
      });

      res.status(200).json({
        success: true,
        client_secret: myPayment.client_secret,
      });
    } catch (error) {
      res.status(500).json({ error: `Payment processing failed ${error} ` });
    }
  } else if (req.method === "GET") {
    res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
