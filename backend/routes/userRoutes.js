import express from "express";
import {
  authorizeGoogleUser,
  postUserLogin,
  postUserSignUp,
  getFavoriteRecipes,
  getFavoriteTakeouts,
  addToFavoriteRecipes
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/auth/google", authorizeGoogleUser);
router.post("/signup", postUserSignUp);
router.post("/login", postUserLogin);

router.get("/favorites/recipe",protect,getFavoriteRecipes);
router.post("/favorites/recipe/:recipeID",protect,addToFavoriteRecipes);
router.get("/favorites/takeout");
router.post("/favorites/takeout/:id");
export default router;
