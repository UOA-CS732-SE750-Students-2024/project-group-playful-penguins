import fetch from "node-fetch";
import dotenv from "dotenv";
import { response } from "express";
import User from "../model/userModel.js";
import { generateAccessToken } from "../middleware/authMiddleware.js";

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
    console.log(user);
    const token = generateAccessToken(user);
    res.status(201).json({
      message: "Found user in DB! Logged in successfully",
      user: { name: user.name, email: email, token: token },
    });
  } catch (error) {
    res.status(400).json({ error: error.message }); // Corrected here
  }
};

// @desc    Fetch all favorite recipe ids
// @route   GET /api/user/favorites/recipe
// @access  Public

const getFavRecipeIDs = async (req, res) => {
  const email = req.query.email;
  try {
      if (!email) {
          return res.status(400).json({ message: "Email is required" });
      }
      const user = await User.findOne({ email: email }, 'favoriteRecipes');
      if (user && user.favoriteRecipes) {
          res.json({ ids: user.favoriteRecipes });
      } else {
          res.status(404).json({ message: "No favorites found" });
      }
  } catch (error) {
      console.error("Server Error:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.toString() });
  }
};

const postFavRecipeID  = async (req, res) => {
  const email = req.query.email;
  const recipeID = req.body.recipeID;
  console.log(email, recipeID)
  try {
    if (!email || !recipeID) {
      return res.status(400).json({ message: "Email and Recipe ID are required" });
    }
    const user = await User.findOneAndUpdate(
      { email: email },
      { $addToSet: { favoriteRecipes: recipeID } }, 
      { new: true, fields: 'favoriteRecipes' } 
    );

    if (user) {
      res.json({ message: "Recipe added to favorites successfully", ids: user.favoriteRecipes });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.toString() });
  }
};

const deleteFavRecipeID = async (req, res) => {
  const email = req.query.email;
  const recipeID = req.body.recipeID;

  try {
    if (!email || !recipeID) {
      return res.status(400).json({ message: "Email and Recipe ID are required" });
    }
    
    const user = await User.findOneAndUpdate(
      { email: email },
      { $pull: { favoriteRecipes: recipeID } },
      { new: true, fields: 'favoriteRecipes' }
    );

    if (user) {
      res.json({ message: "Recipe removed from favorites successfully", ids: user.favoriteRecipes });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.toString() });
  }
};


export { postUserSignUp, postUserLogin, authorizeGoogleUser, getFavRecipeIDs, postFavRecipeID, deleteFavRecipeID };
