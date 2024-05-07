import express from "express";
import {
  authorizeGoogleUser,
  postUserLogin,
  postUserSignUp,
  getFavoriteRecipes
} from "../controllers/userController.js";
const router = express.Router();

router.post("/auth/google", authorizeGoogleUser);
router.post("/signup", postUserSignUp);
router.post("/login", postUserLogin);

router.get("/favorites/recipe",getFavoriteRecipes);

export default router;
