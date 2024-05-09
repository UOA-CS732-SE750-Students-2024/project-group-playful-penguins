import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import express from "express";
import request from "supertest";
import routes from "../routes/recipeRoutes.js";
import { generateAccessToken } from "../middleware/authMiddleware.js";

require("dotenv").config();

const testUser = {
  id: "663c3bec32d5e6141817a49b",
  email: "Testing@gmail.com",
  name: "test",
  favoriteRecipes: [],
  favoriteTakeouts: [],
};
const options = { expiresIn: "1h" };

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const app = express();
app.use(express.json());
app.use("/api/recipes", routes);

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

// describe("GET /api/recipes", () => {
//   it("should return all recipes", async () => {
//     const res = await request(app).get("/api/recipes");
//     console.log(res.body);
//     expect(res.statusCode).toBe(200);
//     expect(res.body.length).toBeGreaterThan(0);
//   });
// });

describe("GET /api/recipes/:id", () => {
  it("should return a recipe", async () => {
    const res = await request(app).get("/api/recipes/657679");
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe(
      "Quinoa Salad With Avocado, Asparagus and Sun Dried Tomatoes"
    );
  });
});

describe("GET /api/recipes/match-recipes", () => {
  const token = jwt.sign(testUser, ACCESS_TOKEN_SECRET, options);

  it("should return a range of recipes", async () => {
    const res = await request(app)
      .get(
        "/api/recipes/match-recipes?searchTerm=&sortBy=&sortOrder=&minCalorieValues=0&maxCalorieValues=100&minCarbohydrateValues=&maxCarbohydrateValues=&minCookingTimeValues=&maxCookingTimeValues=&selectedRequirement="
      )
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.recipes.length).toBe(3);
  });
});
