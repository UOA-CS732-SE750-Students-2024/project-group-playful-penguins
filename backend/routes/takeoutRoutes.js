import express from "express";
const router = express.Router();
import {
  getTakeouts,
  getTakeoutByID,
  getPaginateTakeouts,
} from "../controllers/takeoutController.js";

router.get("/", getTakeouts);
router.get("/:id", getTakeoutByID);
router.get("/search/:q", getPaginateTakeouts);

export default router;
