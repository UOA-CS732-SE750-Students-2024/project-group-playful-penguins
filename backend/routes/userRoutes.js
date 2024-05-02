import express from "express";
import { authorizeGoogleUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/auth/google", authorizeGoogleUser);

export default router;
