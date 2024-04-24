import express from "express";
import { getRecipes } from "../controllers/recipeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/', getRecipes)

export default router;
