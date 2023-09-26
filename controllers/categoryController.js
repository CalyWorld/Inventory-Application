const Category = require("../models/category");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  const [numCategories, numItems, numAvailableCategories, numAvailableItems] =
    await Promise.all([
      Category.countDocuments({}).exec(),
      Item.countDocuments({}).exec(),
      Category.countDocuments({ status: "Available" }).exec(),
      Item.countDocuments({ status: "Available" }).exec(),
    ]);
  res.render("index", {
    title: "Inventory Application",
    category_count: numCategories,
    item_count: numItems,
    category_count_available: numAvailableCategories,
    item_count_available: numAvailableItems,
  });
});

exports.category_list = asyncHandler(async (req, res, next) => {
  res.send("Get Category list");
});

exports.category_detail = asyncHandler(async (req, res, next) => {
  res.send("Get Category detail");
});

exports.category_create_get = asyncHandler(async (req, res, next) => {
  res.send("GET Form Submission on Create");
});

exports.category_create_post = asyncHandler(async (req, res, next) => {
  res.send("POST Form Submission on Create");
});

exports.category_delete_get = asyncHandler(async (req, res, next) => {
  res.send("GET Form Submission on Delete");
});

exports.category_delete_post = asyncHandler(async (req, res, next) => {
  res.send("POST Form Submission on Delete");
});

exports.category_update_get = asyncHandler(async (req, res, next) => {
  res.send("GET Form Submission on Update");
});

exports.category_update_post = asyncHandler(async (req, res, next) => {
  res.send("POST Form Submission on Update");
});
