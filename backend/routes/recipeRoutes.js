import express from "express";
import {
  getRecipes,
  getRecipeByID,
  getPaginateRecipe,
  getFoodRecipes,
} from "../controllers/recipeController.js";

const router = express.Router();
router.get("/match-recipes", getFoodRecipes);

router.get("/", getRecipes);

router.get("/:id", getRecipeByID);
router.get("/search/:q", getPaginateRecipe);

export default router;
