import dotenv from "dotenv";
import { getSortCriteria } from "../functions/getSortCriteria.js";
import mongoose from "mongoose";
const { Schema } = mongoose;
import Recipe from "../model/recipeModel.js";
import asyncHandler from "express-async-handler";
import { getSearchQuery } from "../functions/getSearchQuery.js";
import { verifyAccessToken } from "../middleware/authMiddleware.js";
import { getSearchQuery } from "../functions/getSearchQuery.js";
import { getRecipeCalorieFilterQuery } from "../functions/get-recipe-filter-queries/getRecipeCalorieFilterQuery.js";
import { getRecipeCarbohydrateFilterQuery } from "../functions/get-recipe-filter-queries/getRecipeCarbohydrateFilterQuery.js";
import { getRecipeCookingTimeFilterQuery } from "../functions/get-recipe-filter-queries/getRecipeCookingTimeFilterQuery.js";
import { getDietRequirementQuery } from "../functions/getDietRequirementQuery.js";

dotenv.config();

// @desc    Fetch all recipes
// @route   GET /api/recipes
// @access  Public

const getRecipes = asyncHandler(async (req, res) => {
  try {
    if (
      req.headers &&
      req.headers.authorization &&
      verifyAccessToken(req.headers.authorization)
    ) {
      const recipes = await Recipe.find(
        {},
        { id: 1, title: 1, servings: 1, readyInMinutes: 1, image: 1 }
      );

      if (recipes) {
        res.json(recipes);
      } else {
        res.status(404).send({
          message: "Recipes not found",
        });
        throw new Error("Recipes not found");
      }
    } else {
      res.status(401).send({ message: "Unauthorized" });
      throw new Error("Unauthorized");
    }
  } catch (error) {
    res.send(404, error);
  }
});

// @desc    Fetch a takeout by ID
// @route   GET /api/takeouts/:id
// @access  Public
const getRecipeByID = asyncHandler(async (req, res) => {
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
    }
  );

  if (recipe) {
    res.json(recipe);
  } else {
    res.status(404);
    throw new Error("Recipe not found");
  }
});

// const getFilteredRecipes = async (req, res) => {
//   try {
//     let db = await connectToDatabase(process.env.DB_NAME);
//     const fieldsToRetrieve = {
//       id: 1,
//       healthScore: 1,
//       vegan: 1,
//       glutenFree: 1,
//       lowFodmap: 1,
//       vegetarian: 1,
//     };
//     const sortCriteria = getSortCriteria(req);
//     const query = getFilterQuery(req);
//     let recipes = await db
//       .collection("recipes")
//       .find(query)
//       .sort(sortCriteria)
//       .project(fieldsToRetrieve)
//       .toArray();
//     res.json(recipes);
//   } catch (error) {
//     console.error("Error: ", error);
//   }
// };

// @desc    Fetch all recipe by search terms and filters (non-paginated)
// @route   GET /api/recipes/search/q?key=value
// @access  Public
// http://localhost:8000/api/recipes/search/q?title=Spicy
const getRecipeBySearch = asyncHandler(async (req, res) => {
  const {
    title,
    dietary_requirement,
    minCalorie,
    maxCalorie,
    minCookingTime,
    maxCookingTime,
  } = req.query;

  let query = {};

  if (title) {
    query.title = { $regex: title, $options: "i" };
  }

  if (dietary_requirement) {
    query.diets = { $regex: dietary_requirement, $options: "i" };
  }

  // if (minCalorie && maxCalorie) {
  //   query.calories = { $gte: minCalorie, $lte: maxCalorie };
  // }

  if (minCookingTime && maxCookingTime) {
    query.readyInMinutes = { $gte: minCookingTime, $lte: maxCookingTime };
  }

  const recipes = await Recipe.find(query, {
    id: 1,
    title: 1,
    servings: 1,
    readyInMinutes: 1,
    image: 1,
  });

  if (recipes) {
    res.json(recipes);
  } else {
    res.status(404);
    console.log("Recipe not found : " + query);
  }
});

// @desc    Fetch all recipes by search terms and filters (paginated)
// @route   GET /api/recipes/search/q?key=value&pageNo=1
// @access  Public
// http://localhost:8000/api/recipes/search/q?title=Spicy&pageNo=1&sort=asc
const getPaginateRecipe = asyncHandler(async (req, res) => {
  const pageSize = 9; //todo - put in env
  const page = Number(req.query.pageNo) || 1;
  const {
    title,
    dietary_requirement,
    minCalorie,
    maxCalorie,
    minCookingTime,
    maxCookingTime,
    sort,
  } = req.query;

  let query = {};
  let sortQuery = {};

  if (title) {
    query.title = { $regex: title, $options: "i" };
  }

  if (dietary_requirement) {
    query.diets = { $regex: dietary_requirement, $options: "i" };
  }

  // if (minCalorie && maxCalorie) {
  //   query.calories = { $gte: minCalorie, $lte: maxCalorie };
  // }

  if (minCookingTime && maxCookingTime) {
    query.readyInMinutes = { $gte: minCookingTime, $lte: maxCookingTime };
  }

  if (sort) {
    sortQuery = { title: sort };
  } else {
    sortQuery = { title: "asc" };
  }

  const count = await Recipe.countDocuments({ ...query });
  const recipes = await Recipe.find(
    { ...query },
    { id: 1, title: 1, servings: 1, readyInMinutes: 1, image: 1 }
  )
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort(sortQuery);

  res.json({ recipes, page, pages: Math.ceil(count / pageSize) });
});

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
  } = req.query;
  const sortCriteria = getSortCriteria(sortBy, sortOrder);
  const searchQuery = getSearchQuery(searchTerm);
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
  const dietRequirementQuery = getDietRequirementQuery(selectedRequirement);

  const queries = [
    searchQuery,
    calorieFilterQuery,
    carbohydrateFilterQuery,
    cookingTimeFilterQuery,
    dietRequirementQuery,
  ].filter((query) => query != undefined);

  const query = queries.length > 0 ? { $and: queries } : {};

  try {
    if (
      req.headers &&
      req.headers.authorization &&
      verifyAccessToken(req.headers.authorization)
    ) {
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

export {
  getRecipes,
  getRecipeByID,
  getRecipeBySearch,
  getPaginateRecipe,
  getFoodRecipes,
};
