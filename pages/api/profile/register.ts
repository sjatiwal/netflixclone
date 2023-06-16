import connectDatabase from "@mongo/database";
import User from "@models/users/user";
import { NextApiRequest, NextApiResponse } from "next";
import sendToken from "@jwt/token";

export default async function connectMongo(
  req: NextApiRequest,
  res: NextApiResponse
) {
  connectDatabase();

  try {
    const { email } = req.body;
    var exist = await User.findOne({ email });
    if (exist) {
      res.json("Email already taken");
    }

    let user = await User.create(req.body);

    sendToken(user, 201, res);
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
