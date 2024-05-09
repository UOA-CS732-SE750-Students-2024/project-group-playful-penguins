import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import recipeRoutes from "./src/routes/recipeRoutes.js";
import takeoutRoutes from "./src/routes/takeoutRoutes.js";
import connectToDatabase from "./src/config/mongooseDb.js";
import userRoutes from "./src/routes/userRoutes.js";

dotenv.config();

connectToDatabase();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/recipes", recipeRoutes);
app.use("/api/takeouts", takeoutRoutes);
app.use("/api/user", userRoutes);

const PORT = process.env.PORT;
app.listen(
  PORT,
  console.log(`Server running in localhost mode on port ${PORT}..`)
);
