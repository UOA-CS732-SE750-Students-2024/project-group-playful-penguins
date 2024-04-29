import express from "express";
import {
  getRecipeByID,
  getFilteredRecipes,
  getRecipes,
} from "../controllers/recipeController.js";

const router = express.Router();

router.get("/", getRecipes);

router.get("/filter", getFilteredRecipes);

router.get("/:id", getRecipeByID);

export default router;
