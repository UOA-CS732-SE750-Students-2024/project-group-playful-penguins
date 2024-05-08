import mongoose from "mongoose";
import express from "express";
import request from "supertest";
import routes from "../routes/recipeRoutes.js";

require("dotenv").config();

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
