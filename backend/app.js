import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import recipeRoutes from "./routes/recipeRoutes.js";
import takeoutRoutes from "./routes/takeoutRoutes.js";
import connectToDatabase from "./config/mongooseDb.js";

dotenv.config();

connectToDatabase();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/recipes", recipeRoutes);
app.use("/api/takeouts", takeoutRoutes);

const PORT = process.env.PORT;

app.listen(
  PORT,
  console.log(`Server running in localhost mode on port ${PORT}..`)
  PORT,
  console.log(`Server running in localhost mode on port ${PORT}..`)
);

