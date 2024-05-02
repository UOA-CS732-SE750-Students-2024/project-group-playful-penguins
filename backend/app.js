import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import recipeRoutes from "./routes/recipeRoutes.js";
import takeoutRoutes from "./routes/takeoutRoutes.js";
import connectToDatabase from "./config/mongooseDb.js";
import userRoutes from "./routes/userRoutes.js";
import { postUserSignUp } from "./controllers/userController.js";

dotenv.config();

connectToDatabase();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/recipes", recipeRoutes);
app.use("/api/takeouts", takeoutRoutes);
app.use("/api/user", userRoutes);

app.post("/signup", postUserSignUp);

// TODO: Login
// app.post("login", postUserlogin)

const PORT = process.env.PORT;
app.listen(
  PORT,
  console.log(`Server running in localhost mode on port ${PORT}..`)
);
