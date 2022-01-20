import { refreshToken, initializeApp } from "firebase-admin/app";
import { OAuth2Client } from "google-auth-library";

export const initFirebase = async (token: string) => {
  const oauth2Client = new OAuth2Client(
    process.env.GOOGLE_OAUTH_PUBLIC,
    process.env.GOOGLE_OAUTH_PRIVATE,
    process.env.HOST
  );

  const ticket = await oauth2Client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_OAUTH_PUBLIC,
  });
  console.log(ticket);

  const firebase = initializeApp({
    credential: refreshToken({
      clientId: process.env.GOOGLE_OAUTH_PUBLIC,
      clientSecret: process.env.GOOGLE_OAUTH_PRIVATE,
      refreshToken: token,
      type: "refreshToken", // example taken from https://github.com/firebase/firebase-admin-node/blob/db137e96e6abc77f5008ae902734efa129f40d4e/test/resources/mocks.ts#L142
    }),
  });

  return firebase;
};
