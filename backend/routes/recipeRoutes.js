import express from "express";
import { getRecipes,getRecipeByID, getRecipesByScroll} from "../controllers/recipeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/', getRecipes)

router.get('/scroll', getRecipesByScroll)

router.get('/:id', getRecipeByID)

export default router;
