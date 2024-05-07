import express from "express";
import {
  authorizeGoogleUser,
  postUserLogin,
  postUserSignUp,
  getFavRecipeIDs,
  postFavRecipeID,
  deleteFavRecipeID
} from "../controllers/userController.js";

const router = express.Router();

router.post("/auth/google", authorizeGoogleUser);
router.post("/signup", postUserSignUp);
router.post("/login", postUserLogin);
router.get("/favorites/recipe", getFavRecipeIDs);
router.post("/favorites/updaterecipe", postFavRecipeID);
router.post("/favorites/removerecipe", deleteFavRecipeID);

export default router;
