import type { NextApiRequest, NextApiResponse } from "next";
import { OAuth2Client } from "google-auth-library";
import { initializeApp, refreshToken } from "firebase-admin/app";
import { initFirebase } from "../../lib/firebase/init";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const token = req.headers.authorization;
    console.log(token, !token);
    if (!token) {
      res.status(401).send("Unauthorized");
      return;
    }
    console.log("token", process.env);

    try {
      const res = await initFirebase(token);

      console.log("Firebase", res);
    } catch (e) {
      console.error(e);
      return res.status(500).send(e);
    }

    res.status(200).json("done");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
}
