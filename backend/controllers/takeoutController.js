import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
import mongoose from "mongoose";
const { Schema } = mongoose;
import Takeout from "../model/takeoutModel.js";

dotenv.config();

// @desc    Fetch all takeouts
// @route   GET /api/takeouts
// @access  Public
const getTakeouts = asyncHandler(async (req, res) => {
  const takeouts = await Takeout.find({});

  if (takeouts) {
    res.json(takeouts);
  } else {
    res.status(404);
    throw new Error("Takeouts not found");
  }
});

// @desc    Fetch a takeout by ID
// @route   GET /api/takeouts/:id
// @access  Public
const getTakeoutByID = asyncHandler(async (req, res) => {
  const takeout = await Takeout.findOne({ id: req.params.id });

  if (takeout) {
    res.json(takeout);
  } else {
    res.status(404);
    throw new Error("Takeout not found");
  }
});

// @desc    Fetch all takeout by search terms and filters (non-paginated)
// @route   GET /api/takeouts/search/q?key=value
// @access  Public
// http://localhost:8000/api/takeouts/search/q?dish_name=Spicy
const getTakeoutBySearch = asyncHandler(async (req, res) => {
  const {
    title,
    dietary_requirement,
    minCalorie,
    maxCalorie,
    minPrice,
    maxPrice,
    minDeliveryTime,
    maxDeliveryTime,
  } = req.query;

  let query = {};

  if (title) {
    query.dish_name = { $regex: title, $options: "i" };
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

  if (minDeliveryTime && maxDeliveryTime) {
    query.delivery_time = { $gte: minDeliveryTime, $lte: maxDeliveryTime };
  }

  const takeout = await Takeout.find(query);

  if (takeout) {
    res.json(takeout);
  } else {
    res.status(404);
    console.log("Takeout not found : " + query);
  }
});

// @desc    Fetch all takeout by search terms and filters (paginated)
// @route   GET /api/takeouts/search/q?key=value&pageNo=1
// @access  Public
// http://localhost:8000/api/takeouts/search/q?title=Spicy&pageNo=1&sort=asc
const getPaginateTakeouts = asyncHandler(async (req, res) => {
  const pageSize = 9; //todo - put in env
  const page = Number(req.query.pageNo) || 1;

  const {
    title,
    dietary_requirement,
    minCalorie,
    maxCalorie,
    minPrice,
    maxPrice,
    minDeliveryTime,
    maxDeliveryTime,
    sortOrder,
  } = req.query;

  let query = {};
  let sortQuery = {};

  if (title) {
    query.dish_name = { $regex: title, $options: "i" };
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

  if (minDeliveryTime && maxDeliveryTime) {
    query.delivery_time = { $gte: minDeliveryTime, $lte: maxDeliveryTime };
  }

  if (sortOrder) {
    sortQuery = { dish_name: sortOrder };
  }

  const count = await Takeout.countDocuments({ ...query });
  const takeouts = await Takeout.find({ ...query })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort(sortQuery);

  res.json({ takeouts, page, pages: Math.ceil(count / pageSize) });
});

export { getTakeouts, getTakeoutByID, getPaginateTakeouts };
