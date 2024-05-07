import fetch from "node-fetch";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { response } from "express";
import User from "../model/userModel.js";
import { extractUser, generateAccessToken } from "../middleware/authMiddleware.js";

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

const getFavoriteRecipes = async (req, res) => {
  console.log("Reached backednm found user");
  try {
    if (
      req.headers &&
      req.headers.authorization &&
      verifyAccessToken(req.headers.authorization)
    ) {
      // Access the email from the request object
      const userEmail = extractUser(req.headers.authorization)

      console.log("Reached backendfound user")

      // Find the user by email
      const user = await User.findOne({ email: userEmail });
      if (!user) {
        return res.status(404).send("User not found");
      }

      // Use the list of recipe IDs to find recipes
      if (user.favoriteRecipes.length <= 0) {
        res.json("no favorites yet");
        return;
      }
      const favoriteRecipes = await Recipe.find({
        id: { $in: user.favoriteRecipes },
      });

      res.json(favoriteRecipes);
      console.log(favoriteRecipes);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

export {
  postUserSignUp,
  postUserLogin,
  authorizeGoogleUser,
  getFavoriteRecipes,
};
