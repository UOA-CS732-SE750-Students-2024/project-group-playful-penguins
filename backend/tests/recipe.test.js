import mongoose from "mongoose";
import express from "express";
import request from "supertest";
import routes from "../src/routes/recipeRoutes.js";
import { generateAccessToken } from "../src/middleware/authMiddleware.js";

require("dotenv").config();
require("jest-sorted");

const testUser = {
  id: "663c3bec32d5e6141817a49b",
  email: "Testing@gmail.com",
  name: "test",
  favoriteRecipes: [],
  favoriteTakeouts: [],
};

const app = express();
app.use(express.json());
app.use("/api/recipes", routes);

let token;
/* Connecting to the database before each test, and login. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  token = generateAccessToken(testUser);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

// Test to verify that the API returns a recipe by ID
describe("GET /api/recipes/:id", () => {
  it("should return a specific recipe by ID", async () => {
    const res = await request(app).get("/api/recipes/657679");
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe(
      "Quinoa Salad With Avocado, Asparagus and Sun Dried Tomatoes"
    );
    // Checks if the specific recipe details are correctly fetched by ID
  });
});

// Test to verify that the API returns a specific number of recipes based on a 'chicken' search term
describe("GET /api/recipes/match-recipes", () => {
  it("should return all recipes", async () => {
    const res = await request(app)
      .get(`/api/recipes/match-recipes`)
      .set("Authorization", `\ ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.recipes.length).toBe(39);
    // Expect 38 recipes
  });
});
// Test to verify that the API returns a specific number of recipes based on a 'chicken' search term
describe("GET /api/recipes/match-recipes?searchTerm=${input}", () => {
  it("should return a range of recipes for a given search term", async () => {
    const searchTerm = "chicken";
    const res = await request(app)
      .get(`/api/recipes/match-recipes?searchTerm=${searchTerm}`)
      .set("Authorization", ` ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.recipes.length).toBe(4);
    // Expect 4 recipes related to 'chicken' to be returned
  });
});

// Test to verify the API returns recipes within a specific calorie range
describe("GET /api/recipes/match-recipes?minCalorieValues=${input1}&maxCalorieValues=${input2}", () => {
  it("should return a range of recipes within a specific calorie range", async () => {
    const minCalorieValue = "0";
    const maxCalorieValue = "100";
    const res = await request(app)
      .get(
        `/api/recipes/match-recipes?minCalorieValues=${minCalorieValue}&maxCalorieValues=${maxCalorieValue}`
      )
      .set("Authorization", ` ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.recipes.length).toBe(3);
    // Expect 3 recipes within the specified calorie range
  });
});

// Test to verify the API returns recipes within a specific carbohydrate range
describe("GET /api/recipes/match-recipes?minCarbohydrateValues=${input1}&maxCarbohydrateValues=${input2}", () => {
  it("should return a range of recipes within a specific carbohydrate range", async () => {
    const minCarbohydrateValues = "0";
    const maxCarbohydrateValues = "20";
    const res = await request(app)
      .get(
        `/api/recipes/match-recipes?minCarbohydrateValues=${minCarbohydrateValues}&maxCarbohydrateValues=${maxCarbohydrateValues}`
      )
      .set("Authorization", ` ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.recipes.length).toBe(13);
    // Expect 13 recipes within the specified carbohydrate range
  });
});

describe("GET /api/recipes/match-recipes?minCookingTimeValues=${input1}&maxCookingTimeValues=${input2}", () => {
  // Test to verify the API returns recipes within a specific cooking time range
  it("should return a range of recipes within a specific cooking time range", async () => {
    const minCookingTimeValues = "0";
    const maxCookingTimeValues = "30";
    const res = await request(app)
      .get(
        `/api/recipes/match-recipes?minCookingTimeValues=${minCookingTimeValues}&maxCookingTimeValues=${maxCookingTimeValues}`
      )
      .set("Authorization", ` ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.recipes.length).toBe(5);
    // Expect 5 recipes that can be cooked within 30 minutes
  });
});

describe("GET /api/recipes/match-recipes?selectedRequirement={input}", () => {
  // Test to verify the API returns recipes that match a specific dietary requirement
  it("should return a range of recipes matching a specific dietary requirement", async () => {
    const dietRequirement = "vegan";
    const res = await request(app)
      .get(`/api/recipes/match-recipes?selectedRequirement=${dietRequirement}`)
      .set("Authorization", ` ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.recipes.length).toBe(7);
    // Expect 7 vegan recipes
  });
});

// Tests fetching recipes sorted by 'title' in ascending order to ensure they are returned alphabetically from A to Z.
describe("GET /api/recipes/match-recipes?sortBy=${input1}&sortOrder=${input2}", () => {
  it("should return recipes sorted by name in ascending order", async () => {
    const sortBy = "title";
    const sortOrder = "asc";
    const res = await request(app)
      .get(`/api/recipes/match-recipes?sortBy=${sortBy}&sortOrder=${sortOrder}`)
      .set("Authorization", ` ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.recipes.length).toBe(39);
    expect(res.body.recipes).toBeSortedBy("title", { ascending: true });
  });
});

// Tests fetching recipes sorted by 'title' in descending order to verify they are listed from Z to A, ensuring correct reverse alphabetical order.
describe("GET /api/recipes/match-recipes?sortBy=${input1}&sortOrder=${input2}", () => {
  it("should return recipes sorted by name in descending order", async () => {
    const sortBy = "title";
    const sortOrder = "desc";
    const res = await request(app)
      .get(`/api/recipes/match-recipes?sortBy=${sortBy}&sortOrder=${sortOrder}`)
      .set("Authorization", ` ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.recipes.length).toBe(39);
    expect(res.body.recipes).toBeSortedBy("title", { descending: true });
  });
});

// Tests fetching recipes that filtered by multiple conditions
describe("GET /api/recipes/match-recipes?searchTerm=cu&sortBy=title&sortOrder=desc&minCalorieValues=0&maxCalorieValues=2000&minCarbohydrateValues=0&maxCarbohydrateValues=250&minCookingTimeValues=0&maxCookingTimeValues=150&selectedRequirement=vegan", () => {
  it("should return recipes the in the range of multiple filters", async () => {
    const res = await request(app)
      .get(
        `/api/recipes/match-recipes?searchTerm=cu&sortBy=title&sortOrder=desc&minCalorieValues=0&maxCalorieValues=2000&minCarbohydrateValues=0&maxCarbohydrateValues=250&minCookingTimeValues=0&maxCookingTimeValues=150&selectedRequirement=vegan`
      )
      .set("Authorization", ` ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.recipes.length).toBe(1);
  });
});
