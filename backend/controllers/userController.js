import fetch from "node-fetch";
import dotenv from "dotenv";
import { response } from "express";
import User from "../model/userModel.js";
<<<<<<< Updated upstream
import { generateAccessToken } from "../middleware/authMiddleware.js";
=======
import { extractUser, generateAccessToken ,verifyAccessToken} from "../middleware/authMiddleware.js";

>>>>>>> Stashed changes

dotenv.config();

const authorizeGoogleUser = (req, res) => {
  try {
    const { code } = req.body;
    const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
    const REDIRECT_URL = process.env.REDIRECT_URL;
    const GOOGLE_API = process.env.GOOGLE_API;
    const grant_type = "authorization_code";

    fetch(GOOGLE_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URL,
        grant_type,
      }),
    })
      .then((response) => response.json())
      .then((tokens) => {
        res.json(tokens);
      });
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

const postUserLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = generateAccessToken(user);
    res.status(201).json({
      message: "Found user in DB! Logged in successfully",
      user: { name: user.name, email: email, token: token },
    });
  } catch (error) {
    res.status(400).json({ error: error.message }); // Corrected here
  }
};

export { postUserSignUp, postUserLogin, authorizeGoogleUser };
