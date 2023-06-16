import connectDatabase from "@mongo/database";
import User from "@models/users/user";
import { NextApiRequest, NextApiResponse } from "next";
import sendToken from "@jwt/token";

export default async function connectMongo(
  req: NextApiRequest,
  res: NextApiResponse
) {
  connectDatabase();
  const { email, password } = req.body;

  if (!email || !password) {
    return "Email or Password not provided";
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    res.json("No user Found");
  }
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    res.json("Invalid Email or Password ");
  }

  user.password = undefined;

  sendToken(user, 201, res);
}
