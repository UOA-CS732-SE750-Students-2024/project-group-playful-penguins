import dotenv from "dotenv";
import { getSortCriteria } from "../functions/getSortCriteria.js";
import mongoose from "mongoose";
import { jwtDecode } from "jwt-decode";
const { Schema } = mongoose;
import Recipe from "../model/recipeModel.js";
import { verifyAccessToken } from "../middleware/authMiddleware.js";
import { getRecipeSearchQuery } from "../functions/get-recipe-filter-queries/getRecipeSearchQuery.js";
import { getRecipeCalorieFilterQuery } from "../functions/get-recipe-filter-queries/getRecipeCalorieFilterQuery.js";
import { getRecipeCarbohydrateFilterQuery } from "../functions/get-recipe-filter-queries/getRecipeCarbohydrateFilterQuery.js";
import { getRecipeCookingTimeFilterQuery } from "../functions/get-recipe-filter-queries/getRecipeCookingTimeFilterQuery.js";
import { getRecipeDietRequirementQuery } from "../functions/get-recipe-filter-queries/getRecipeDietRequirementQuery.js";
import { getFavoritesQuery } from "../functions/getFavoritesQuery.js";

dotenv.config();

// @desc    Fetch a takeout by ID
// @route   GET /api/takeouts/:id
// @access  Public
const getRecipeByID = async (req, res) => {
  const recipeID = parseInt(req.params.id, 10);

  const recipe = await Recipe.findOne(
    { id: recipeID },
    {
      id: 1,
      title: 1,
      servings: 1,
      readyInMinutes: 1,
      image: 1,
      dishTypes: 1,
      diets: 1,
      summary: 1,
      cuisines: 1,
      extendedIngredients: 1,
      analyzedInstructions: 1,
      "nutrition.nutrients": 1,
    }
  );

  if (recipe) {
    res.status(200).json(recipe);
  } else {
    res.status(404);
    throw new Error("Recipe not found");
  }
};

const getFoodRecipes = async (req, res) => {
  const {
    searchTerm,
    sortBy,
    sortOrder,
    minCalorieValues,
    maxCalorieValues,
    minCarbohydrateValues,
    maxCarbohydrateValues,
    minCookingTimeValues,
    maxCookingTimeValues,
    selectedRequirement,
    favoritesSelection,
  } = req.query;

  const authToken =
    req.headers && req.headers.authorization ? req.headers.authorization : "";
  const email = authToken ? jwtDecode(authToken).email : "";
  const sortCriteria = getSortCriteria(sortBy, sortOrder);
  const searchQuery = getRecipeSearchQuery(searchTerm);
  const calorieFilterQuery = getRecipeCalorieFilterQuery(
    minCalorieValues,
    maxCalorieValues
  );
  const carbohydrateFilterQuery = getRecipeCarbohydrateFilterQuery(
    minCarbohydrateValues,
    maxCarbohydrateValues
  );
  const cookingTimeFilterQuery = getRecipeCookingTimeFilterQuery(
    minCookingTimeValues,
    maxCookingTimeValues
  );
  const dietRequirementQuery =
    getRecipeDietRequirementQuery(selectedRequirement);
  const favoritesQuery = await getFavoritesQuery(
    true,
    email,
    favoritesSelection
  );

  const queries = [
    searchQuery,
    favoritesQuery,
    calorieFilterQuery,
    carbohydrateFilterQuery,
    cookingTimeFilterQuery,
    dietRequirementQuery,
  ].filter((query) => query != undefined);

  const query = queries.length > 0 ? { $and: queries } : {};

  try {
    if (await verifyAccessToken(authToken)) {
      const matchRecipes = await Recipe.search(query, sortCriteria);
      res.status(200).json({
        recipes: matchRecipes,
      });
    } else {
      const error = new Error("Unauthorized");
      error.status = 401;
      throw error;
    }
  } catch (error) {
    res.send(error.status, error);
  }
};

export { getRecipeByID, getFoodRecipes };
