import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { jwtDecode } from "jwt-decode";
const { Schema } = mongoose;
import Takeout from "../model/takeoutModel.js";
import { verifyAccessToken } from "../middleware/authMiddleware.js";
import { getTakeoutCalorieFilterQuery } from "../functions/get-takeout-queries/getTakeoutCalorieFilterQuery.js";
import { getTakeoutDeliveryFeeFilterQuery } from "../functions/get-takeout-queries/getTakeoutDeliveryFeeFilterQuery.js";
import { getSortCriteria } from "../functions/getSortCriteria.js";
import { getTakeoutFoodPriceFilterQuery } from "../functions/get-takeout-queries/getTakeoutFoodPriceFilterQuery.js";
import { getTakeoutSearchQuery } from "../functions/get-takeout-queries/getTakeoutSearchQuery.js";
import { getTakeoutDietRequirementQuery } from "../functions/get-takeout-queries/getTakeoutDietRequirementQuery.js";
import { getFavoritesQuery } from "../functions/getFavoritesQuery.js";

dotenv.config();

// @desc    Fetch a takeout by ID
// @route   GET /api/takeouts/:id
// @access  Public
const getTakeoutByID = asyncHandler(async (req, res) => {
  const takeout = await Takeout.findOne({ id: req.params.id });

  if (takeout) {
    res.json(takeout);
  } else {
    res.status(404);
    throw new Error("Takeout not found");
  }
});


const getFoodTakeout = async (req, res) => {
  const {
    searchTerm,
    sortBy,
    sortOrder,
    minCalorieValues,
    maxCalorieValues,
    minFoodPriceValues,
    maxFoodPriceValues,
    minDeliveryFeeValues,
    maxDeliveryFeeValues,
    selectedRequirement,
    favoritesSelection,
  } = req.query;
  const authToken =
    req.headers && req.headers.authorization ? req.headers.authorization : "";
  const email = jwtDecode(authToken).email;
  const sortCriteria = getSortCriteria(sortBy, sortOrder);
  const searchQuery = getTakeoutSearchQuery(searchTerm);
  const calorieFilterQuery = getTakeoutCalorieFilterQuery(
    minCalorieValues,
    maxCalorieValues
  );
  const foodPriceFilterQuery = getTakeoutFoodPriceFilterQuery(
    minFoodPriceValues,
    maxFoodPriceValues
  );
  const deliveryFeeFilterQuery = getTakeoutDeliveryFeeFilterQuery(
    minDeliveryFeeValues,
    maxDeliveryFeeValues
  );
  const dietRequirementQuery =
    getTakeoutDietRequirementQuery(selectedRequirement);

  const favoritesQuery = await getFavoritesQuery(
    false,
    email,
    favoritesSelection
  );

  const queries = [
    searchQuery,
    favoritesQuery,
    calorieFilterQuery,
    foodPriceFilterQuery,
    deliveryFeeFilterQuery,
    dietRequirementQuery,
  ].filter((query) => query != undefined);

  const query = queries.length > 0 ? { $and: queries } : {};

  try {
    if (verifyAccessToken(authToken)) {
      const matchRecipes = await Takeout.search(query, sortCriteria);
      res.status(200).json({
        takeouts: matchRecipes,
      });
    } else {
      const error = new Error("Unathorized");
      error.status = 401;
      throw error;
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { getTakeoutByID, getFoodTakeout };
