import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
import mongoose from "mongoose";
const { Schema } = mongoose;
import Takeout from "../model/takeoutModel.js";
import connectToDatabase from "../config/db.js";

dotenv.config();

const getTakeouts = asyncHandler(async (req, res) => {
  const takeouts = await Takeout.find({});

  if (takeouts) {
    res.json(takeouts);
  } else {
    res.status(404);
    throw new Error("Takeouts not found");
  }
});

const getTakeoutByID = asyncHandler(async (req, res) => {
  const takeout = await Takeout.findOne({ id: req.params.id });

  if (takeout) {
    res.json(takeout);
  } else {
    res.status(404);
    throw new Error("Takeout not found");
  }
});

// http://localhost:8000/api/takeouts/search/q?dish_name=Spicy
const getTakeoutBySearch = asyncHandler(async (req, res) => {
  const {
    dish_name,
    dietary_requirement,
    minCalorie,
    maxCalorie,
    minPrice,
    maxPrice,
    minDeliveryTime,
    maxDeliveryTime,
  } = req.query;

  let query = {};

  if (dish_name) {
    query.dish_name = { $regex: dish_name, $options: "i" };
  }

  if (dietary_requirement) {
    query.dietary_requirement = { $regex: dietary_requirement, $options: "i" };
  }

  if (minCalorie && maxCalorie) {
    query.calories = { $gte: minCalorie, $lte: maxCalorie };
  }

  if (minPrice && maxPrice) {
    query.price = { $gte: minPrice, $lte: maxPrice };
  }

  const takeout = await Takeout.find(query);

  if (takeout) {
    res.json(takeout);
  } else {
    res.status(404);
    console.log("Takeout not found : " + query);
  }
});

// default - http://localhost:8000/api/takeouts/paginate/q
// paginate - http://localhost:8000/api/takeouts/paginate/q?dish_name=spicy&pageNo=2
const getPaginateTakeouts = asyncHandler(async (req, res) => {
  const pageSize = 1; //todo - put in env
  const page = Number(req.query.pageNo) || 1;
  const query = req.query.dish_name
    ? {
        dish_name: { $regex: req.query.dish_name, $options: "i" },
      }
    : {};

  const count = await Takeout.countDocuments({ ...query });
  const takeouts = await Takeout.find({ ...query })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ takeouts, page, pages: Math.ceil(count / pageSize) });
});

export { getTakeouts, getTakeoutByID, getTakeoutBySearch, getPaginateTakeouts };
