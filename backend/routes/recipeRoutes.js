import express from "express";
import {
  getFilteredRecipes,
  getRecipes,
  getRecipeByID,
  getPaginateRecipe,
  getFoodRecipes,
} from "../controllers/recipeController.js";

const router = express.Router();

router.get("/", getRecipes);

router.get("/filter", getFilteredRecipes);
router.get("/:id", getRecipeByID);
router.get("/search/:q", getPaginateRecipe);
// TODO: change route
router.get("/match-recipes/:query", getFoodRecipes);

export default router;
