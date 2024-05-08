import express from "express";
import {
  getTakeoutByID,
  getFoodTakeout,
} from "../controllers/takeoutController.js";

const router = express.Router();

router.get("/match-takeouts", getFoodTakeout);
router.get("/:id", getTakeoutByID);
// router.get("/search/:q", getPaginateTakeouts);

export default router;
