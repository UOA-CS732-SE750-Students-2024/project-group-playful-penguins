import fetch from "node-fetch";
import dotenv from "dotenv";
import { response } from "express";

dotenv.config();

const authorizeGoogleUser = (req, res) => {
  try {
    const { code } = req.body;
    const client_id = process.env.GOOGLE_CLIENT_ID;
    const client_secret = process.env.GOOGLE_CLIENT_SECRET;
    const redirect_uri = process.env.REDIRECT_URL;
    const grant_type = "authorization_code";

    fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id,
        client_secret,
        redirect_uri,
        grant_type,
      }),
    })
      .then((response) => response.json())
      .then((tokens) => res.json(tokens));
  } catch (error) {
    console.error("Error: ", error);
  }
};

export { authorizeGoogleUser };
