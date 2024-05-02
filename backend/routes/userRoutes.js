import express from "express";
import {
  authorizeGoogleUser,
  postUserLogin,
  postUserSignUp,
  verifyUser
} from "../controllers/userController.js";

const router = express.Router();

router.post("/auth/google", authorizeGoogleUser);
router.post("/signup", postUserSignUp);
router.post("/login", postUserLogin);
router.post("/verify", verifyUser);

export default router;
