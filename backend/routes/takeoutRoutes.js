import express from "express";
import {
  getTakeouts,
  getTakeoutByID,
  getFoodTakeout,
} from "../controllers/takeoutController.js";

const router = express.Router();

router.get("/match-takeouts", getFoodTakeout);
router.get("/", getTakeouts);
router.get("/:id", getTakeoutByID);
// router.get("/search/:q", getPaginateTakeouts);

export default router;
