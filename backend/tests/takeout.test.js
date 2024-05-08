import mongoose from "mongoose";
import express from "express";
import request from "supertest";
import routes from "../routes/takeoutRoutes.js";

require("dotenv").config();

const app = express();
app.use(express.json());
app.use("/api/takeouts", routes);

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

describe("GET /api/takeouts", () => {
  it("should return all takeouts", async () => {
    const res = await request(app).get("/api/takeouts");
    // console.log(res.body);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe("GET /api/takeouts/:id", () => {
  it("should return a takeout", async () => {
    const res = await request(app).get("/api/takeouts/t1");
    expect(res.statusCode).toBe(200);
    // console.log(res.body);
    expect(res.body.dish_name).toBe("Spicy Black Bean Burgers");
  });
});
