import express from "express";
const router = express.Router();
import {
  getTakeouts,
  getTakeoutByID,
  getTakeoutBySearch,
  getPaginateTakeouts,
} from "../controllers/takeoutController.js";

router.get("/", getTakeouts);
router.get("/:id", getTakeoutByID);
router.get("/search/:q", getTakeoutBySearch);
router.get("/paginate/:q", getPaginateTakeouts);

export default router;
