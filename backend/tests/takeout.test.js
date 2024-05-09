import mongoose from "mongoose";
import express from "express";
import request from "supertest";
import routes from "../src/routes/takeoutRoutes.js";
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
app.use("/api/takeouts", routes);

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

// Test to verify that the API returns a takeout by ID
describe("GET /api/takeouts/:id", () => {
  it("should return a specific takeout by ID", async () => {
    const res = await request(app).get("/api/takeouts/t1");
    expect(res.statusCode).toBe(200);
    expect(res.body.dish_name).toBe("Spicy Black Bean Burgers");
    // Checks if the specific takeout details are correctly fetched by ID
  });
});

// Test to verify that the API returns a specific number of takeouts based on a 'chicken' search term
describe("GET /api/takeouts/match-takeouts", () => {
  it("should return all takeouts", async () => {
    const res = await request(app)
      .get(`/api/takeouts/match-takeouts`)
      .set("Authorization", ` ${token}`);
    expect(res.body.takeouts.length).toBe(21);
    // Expect 21 takeouts
  });
});

// Test to verify that the API returns a specific number of takeouts based on a 'chicken' search term
describe("GET /api/takeouts/match-takeouts?searchTerm=${input}", () => {
  it("should return a range of takeouts for a given search term", async () => {
    const searchTerm = "chicken";
    const res = await request(app)
      .get(`/api/takeouts/match-takeouts?searchTerm=${searchTerm}`)
      .set("Authorization", ` ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.takeouts.length).toBe(7);
    // Expect 7 takeouts related to 'chicken' to be returned
  });
});

// Test to verify the API returns takeouts within a specific calorie range
describe("GET /api/takeouts/match-takeouts?minCalorieValues=${input1}&maxCalorieValues=${input2}", () => {
  it("should return a range of takeouts within a specific calorie range", async () => {
    const minCalorieValue = "0";
    const maxCalorieValue = "10";
    const res = await request(app)
      .get(
        `/api/takeouts/match-takeouts?minCalorieValues=${minCalorieValue}&maxCalorieValues=${maxCalorieValue}`
      )
      .set("Authorization", ` ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.takeouts.length).toBe(0);
    // Expect 0 takeouts within the specified calorie range
  });
});

// Test to verify the API returns takeouts within a specific carbohydrate range
describe("GET /api/takeouts/match-takeouts?minFoodPriceValues=${input1}&maxFoodPriceValues=${input2}", () => {
  it("should return a range of takeouts within a specific carbohydrate range", async () => {
    const minFoodPriceValues = "0";
    const maxFoodPriceValues = "5";
    const res = await request(app)
      .get(
        `/api/takeouts/match-takeouts?minFoodPriceValues=${minFoodPriceValues}&maxFoodPriceValues=${maxFoodPriceValues}`
      )
      .set("Authorization", ` ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.takeouts.length).toBe(0);
    // Expect 0 takeouts within the specified carbohydrate range
  });
});

describe("GET /api/takeouts/match-takeouts?minDeliveryFeeValues=${input1}&maxDeliveryFeeValues=${input2}", () => {
  // Test to verify the API returns takeouts within a specific cooking time range
  it("should return a range of takeouts within a specific cooking time range", async () => {
    const minDeliveryFeeValues = "0";
    const maxDeliveryFeeValues = "5";
    const res = await request(app)
      .get(
        `/api/takeouts/match-takeouts?minDeliveryFeeValues=${minDeliveryFeeValues}&maxDeliveryFeeValues=${maxDeliveryFeeValues}`
      )
      .set("Authorization", ` ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.takeouts.length).toBe(11);
    // Expect 11 takeouts that can be cooked within 30 minutes
  });
});

describe("GET /api/takeouts/match-takeouts?selectedRequirement={input}", () => {
  // Test to verify the API returns takeouts that match a specific dietary requirement
  it("should return a range of takeouts matching a specific dietary requirement", async () => {
    const dietRequirement = "vegan";
    const res = await request(app)
      .get(
        `/api/takeouts/match-takeouts?selectedRequirement=${dietRequirement}`
      )
      .set("Authorization", ` ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.takeouts.length).toBe(9);
    // Expect 9 vegan takeouts
  });
});

// Tests fetching takeouts sorted by 'dish_name' in ascending order to ensure they are returned alphabetically from A to Z.
describe("GET /api/takeouts/match-takeouts?sortBy=${input1}&sortOrder=${input2}", () => {
  it("should return takeouts sorted by name in ascending order", async () => {
    const sortBy = "dish_name";
    const sortOrder = "asc";
    const res = await request(app)
      .get(
        `/api/takeouts/match-takeouts?sortBy=${sortBy}&sortOrder=${sortOrder}`
      )
      .set("Authorization", ` ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.takeouts.length).toBe(21);
    expect(res.body.takeouts).toBeSortedBy("dish_name", { ascending: true });
  });
});

// Tests fetching takeouts sorted by 'dish_name' in descending order to verify they are listed from Z to A, ensuring correct reverse alphabetical order.
describe("GET /api/takeouts/match-takeouts?sortBy=${input1}&sortOrder=${input2}", () => {
  it("should return takeouts sorted by name in descending order", async () => {
    const sortBy = "dish_name";
    const sortOrder = "desc";
    const res = await request(app)
      .get(
        `/api/takeouts/match-takeouts?sortBy=${sortBy}&sortOrder=${sortOrder}`
      )
      .set("Authorization", ` ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.takeouts.length).toBe(21);
    expect(res.body.takeouts).toBeSortedBy("dish_name", { descending: true });
  });
});

// Tests fetching takeouts that filtered by multiple conditions
describe("GET /api/takeouts/match-takeouts?searchTerm=cu&sortBy=dish_name&sortOrder=desc&minCalorieValues=0&maxCalorieValues=2000&minFoodPriceValues=0&maxFoodPriceValues=250&minDeliveryFeeValues=0&maxDeliveryFeeValues=150&selectedRequirement=vegan", () => {
  it("should return takeouts the in the range of multiple filters", async () => {
    const res = await request(app)
      .get(
        `/api/takeouts/match-takeouts?searchTerm=cu&sortBy=dish_name&sortOrder=desc&minCalorieValues=0&maxCalorieValues=2000&minFoodPriceValues=0&maxFoodPriceValues=250&minDeliveryFeeValues=0&maxDeliveryFeeValues=150&selectedRequirement=vegan`
      )
      .set("Authorization", ` ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.takeouts.length).toBe(2);
  });
});
