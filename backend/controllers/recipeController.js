import asyncHandler from "express-async-handler";
import connectToDatabase from "../config/db.js";
import dotenv from "dotenv";

dotenv.config();

const getRecipes = async (event) => {
  try {
    let db = await connectToDatabase(process.env.DB_NAME);
    const fieldsToRetrieve = {
      id: 1,
      title: 1,
      servings: 1,
      readyInMinutes: 1,
      image: 1,
    };
    let recipes = await db
      .collection("recipes")
      .find()
      .project(fieldsToRetrieve)
      .toArray();
    event.res.json(recipes);
  } catch (error) {
    console.error("Error: ", error);
  }
};

const getRecipeByID = async (req, res) => {
  const recipeID = parseInt(req.params.id, 10);
  console.log("reached backend");
  try {
    let db = await connectToDatabase(process.env.DB_NAME);
    const fieldsToRetrieve = {
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
    };
    let recipe = await db
      .collection("recipes")
      .findOne({ id: recipeID }, { projection: fieldsToRetrieve });

    res.json(recipe);
  } catch (error) {
    console.error("Error: ", error);
  }
};

export { getRecipes, getRecipeByID };
