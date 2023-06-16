import { NextApiRequest, NextApiResponse } from "next";
import connectDatabase from "@mongo/database";

export default async function connectMongo(
  req: NextApiRequest,
  res: NextApiResponse
) {
  connectDatabase();

  const options = {
    expires: new Date(Date.now()),
    httpOnly: true,
  };
  res.setHeader("Set-Cookie", `token=${null};  options=${options}`);

  res.status(200).json({
    success: true,
    message: "Logged out",
  });
}
