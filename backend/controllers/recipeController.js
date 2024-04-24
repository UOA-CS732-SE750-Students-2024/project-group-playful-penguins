import asyncHandler from "express-async-handler";
import connectToDatabase from "../config/db.js";
import dotenv from 'dotenv';

dotenv.config();

const getRecipes = async (event) => {
  try {
    let db = await connectToDatabase(process.env.DB_NAME);
    let recipes = await db.collection("recipes").find().toArray();
    event.res.json(recipes)
  } catch (error) {
    console.error('Error: ', error);
  }
}

export { getRecipes };
