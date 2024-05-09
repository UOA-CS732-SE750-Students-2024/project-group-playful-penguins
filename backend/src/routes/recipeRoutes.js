import express from "express";
import {
  getRecipeByID,
  getFoodRecipes,
} from "../controllers/recipeController.js";

const router = express.Router();
router.get("/match-recipes", getFoodRecipes);
router.get("/:id", getRecipeByID);

export default router;
