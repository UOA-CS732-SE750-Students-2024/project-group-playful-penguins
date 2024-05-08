import express from "express";
import {
  authorizeGoogleUser,
  postUserLogin,
  postUserSignUp,
  postFavRecipeID,
  deleteFavRecipeID,
  postFavTakeoutID,
  deleteFavTakeoutID,
  getFavoriteIds
} from "../controllers/userController.js";

const router = express.Router();

router.post("/auth/google", authorizeGoogleUser);
router.post("/signup", postUserSignUp);
router.post("/login", postUserLogin);
router.get("/favorites/get", getFavoriteIds);
router.post("/favorites/updaterecipe", postFavRecipeID);
router.post("/favorites/removerecipe", deleteFavRecipeID);
router.post("/favorites/updatetakeout", postFavTakeoutID);
router.post("/favorites/removetakeout", deleteFavTakeoutID);

export default router;
