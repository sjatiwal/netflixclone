import { UserDocument } from "@models/users/user";

import { NextApiResponse } from "next";

const sendToken = (
  user: UserDocument,
  statusCode: number,
  res: NextApiResponse
): void => {
  const token: string = user.getJWTToken();

  // Options for cookie
  const options = {
    expires: new Date(
      Date.now() + Number(process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res.setHeader("Set-Cookie", `token=${token};  options=${options}`);
  res.status(statusCode).json({
    success: true,
    user,
    token,
  });
};

export default sendToken;
