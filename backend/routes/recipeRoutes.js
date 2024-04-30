import express from "express";
import {
  getFilteredRecipes,
  getRecipes,
  getRecipeByID,
  getPaginateRecipe,
} from "../controllers/recipeController.js";

const router = express.Router();

router.get("/", getRecipes);

router.get("/filter", getFilteredRecipes);
router.get("/:id", getRecipeByID);
router.get("/search/:q", getPaginateRecipe);

export default router;
