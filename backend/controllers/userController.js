import fetch from "node-fetch";
import dotenv from "dotenv";
import { response } from "express";
import User from "../model/userModel.js";
import { generateAccessToken } from "../token/generateAccessToken.js";
import { verifyAccessToken } from "../middleware/authMiddleware.js";

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

const postUserSignUp = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.signup(name, email, password);
    const token = generateAccessToken(user);
    res.status(201).json({
      message: "User successfully registered!",
      user: { name: name, email: email, token: token },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const verifyUser = (req, res) => {
  const { token } = req.body;
  try {
    const decode = verifyAccessToken(req.token);
    req.status(200).json({
      decode,
    });
  } catch (error) {
    res.status(401).json({ error: "unauthorized" });
  }
};

// TODO: Login
const postUserLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = generateAccessToken(user);
    res.status(201).json({
      message: "Found user in DB! Logged in successfully",
      user: { email: email, token: token },
    });
  } catch (error) {
    res.status(400).json({ error: error.message }); // Corrected here
  }
};

export { postUserSignUp, postUserLogin, authorizeGoogleUser, verifyUser };
