import asyncHandler from "express-async-handler";
import connectToDatabase from "../config/db.js";
import dotenv from 'dotenv';

dotenv.config();

const getRecipes = async (event) => {
  try {
    let db = await connectToDatabase(process.env.DB_NAME);
    const fieldsToRetrieve = {id:1,title:1,servings:1,readyInMinutes:1,image:1}
    let recipes = await db.collection("recipes").find().project(fieldsToRetrieve).toArray();
    console.log(recipes)
    event.res.json(recipes)
  } catch (error) {
    console.error('Error: ', error);
  }
}

export { getRecipes };
