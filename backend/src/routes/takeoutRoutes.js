import express from "express";
import {
  getTakeoutByID,
  getFoodTakeout,
} from "../controllers/takeoutController.js";

const router = express.Router();

router.get("/match-takeouts", getFoodTakeout);
router.get("/:id", getTakeoutByID);

export default router;
