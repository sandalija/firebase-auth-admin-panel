import type { NextApiRequest, NextApiResponse } from "next";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const token = req.headers.authorization;
    console.log("token", process.env);

    const oauth2Client = new OAuth2Client(
      process.env.GOOGLE_OAUTH_PUBLIC,
      process.env.GOOGLE_OAUTH_PRIVATE,
      process.env.HOST
    );
    const ticket = await oauth2Client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_OAUTH_PUBLIC,
    });

    await res.status(200).json({ ticket });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
}
