import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import recipeRoutes from "./routes/recipeRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/recipes", recipeRoutes);
app.use("/api/user", userRoutes);

const PORT = process.env.PORT;

app.listen(
    PORT,
    console.log(
        `Server running in localhost mode on port ${PORT}..`
    )
);