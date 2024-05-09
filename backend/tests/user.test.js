import mongoose from "mongoose";
import express from "express";
import request from "supertest";
import routes from "../src/routes/userRoutes.js";

require("dotenv").config();
jest.mock("node-fetch", () => jest.fn());

const app = express();
app.use(express.json());
app.use("/api/user", routes);

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

describe("POST /api/user/login", () => {
  it("should return a specific user", async () => {
    const testEmail = "helloworld@aucklanduni.ac.nz";
    const requestBody = {
      email: testEmail,
      password: "12345678",
    };

    const res = await request(app).post("/api/user/login").send(requestBody);
    expect(res.statusCode).toBe(201);
    expect(res.body.user.name).toBe("Hello World");
    expect(res.body.user.email).toBe(testEmail);
  });
});

describe("POST /api/user/signup", () => {
  it("should return a specific user signup", async () => {
    const testName = "John Doe";
    const testEmail = "johndoe@aucklanduni.ac.nz";
    const requestBody = {
      name: testName,
      email: testEmail,
      password: "12345678",
    };

    const res = await request(app).post("/api/user/signup").send(requestBody);
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("User successfully registered!");

    expect(res.body.user.name).toBe(testName);
    expect(res.body.user.email).toBe(testEmail);

    //clean up test user
    const result = await mongoose.connection.db
      .collection("users")
      .findOneAndDelete({ email: testEmail });
  });
});

describe("GET /api/user/favorites/get", () => {
  it("should return all favourites", async () => {
    const testEmail = "helloworld@aucklanduni.ac.nz";
    const requestBody = {
      email: testEmail,
    };

    const res = await request(app).get(
      "/api/user/favorites/get?email=" + testEmail
    );

    // console.log(res.body);
    expect(res.statusCode).toBe(200);
    expect(res.body.favIds.recipes.length).toBe(3);
    expect(res.body.favIds.takeouts.length).toBe(3);
  });
});

describe("POST /api/user/favorites/updaterecipe", () => {
  it("should add a favourite recipe", async () => {
    const testRecipeID = 659060;
    const testEmail = "helloworld@aucklanduni.ac.nz";

    const requestBody = {
      recipeID: testRecipeID,
    };

    const res = await request(app)
      .post("/api/user/favorites/updaterecipe?email=" + testEmail)
      .send(requestBody);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Recipe added to favorites successfully");
    expect(res.body.ids).toContain(659060);

    const result = await mongoose.connection.db
      .collection("users")
      .findOneAndUpdate(
        { email: testEmail },
        { $pull: { favoriteRecipes: testRecipeID } },
        { new: true, fields: "favoriteRecipes" }
      );
  });
});

describe("POST /api/user/favorites/removerecipe", () => {
  it("should remove a favourite recipe", async () => {
    const testRecipeID = 659060;
    const testEmail = "helloworld@aucklanduni.ac.nz";

    const requestBody = {
      recipeID: testRecipeID,
    };

    const result = await mongoose.connection.db
      .collection("users")
      .findOneAndUpdate(
        { email: testEmail },
        { $addToSet: { favoriteRecipes: testRecipeID } },
        { new: true, fields: "favoriteRecipes" }
      );

    const deleteRes = await request(app)
      .post("/api/user/favorites/removerecipe?email=" + testEmail)
      .send(requestBody);

    expect(deleteRes.statusCode).toBe(200);
    expect(deleteRes.body.message).toBe(
      "Recipe removed from favorites successfully"
    );
    expect(deleteRes.body.ids).not.toContain(testRecipeID);
  });
});

describe("POST /api/user/favorites/updatetakeout", () => {
  it("should add a favourite takeout", async () => {
    const testTakeoutID = "t21";
    const testEmail = "helloworld@aucklanduni.ac.nz";

    const requestBody = {
      takeoutID: testTakeoutID,
    };

    const res = await request(app)
      .post("/api/user/favorites/updatetakeout?email=" + testEmail)
      .send(requestBody);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Takeout added to favorites successfully");
    expect(res.body.ids).toContain(testTakeoutID);

    const result = await mongoose.connection.db
      .collection("users")
      .findOneAndUpdate(
        { email: testEmail },
        { $pull: { favoriteTakeouts: testTakeoutID } },
        { new: true, fields: "favoriteTakeouts" }
      );
  });
});

describe("POST /api/user/favorites/removetakeout", () => {
  it("should remove a favourite takeout", async () => {
    const testTakeoutID = "t21";
    const testEmail = "helloworld@aucklanduni.ac.nz";

    const requestBody = {
      takeoutID: testTakeoutID,
    };

    const result = await mongoose.connection.db
      .collection("users")
      .findOneAndUpdate(
        { email: testEmail },
        { $pull: { favoriteTakeouts: testTakeoutID } },
        { new: true, fields: "favoriteTakeouts" }
      );

    const deleteRes = await request(app)
      .post("/api/user/favorites/removetakeout?email=" + testEmail)
      .send(requestBody);

    expect(deleteRes.statusCode).toBe(200);
    expect(deleteRes.body.message).toBe(
      "Takeout removed from favorites successfully"
    );
    expect(deleteRes.body.ids).not.toContain(testTakeoutID);
  });
});
