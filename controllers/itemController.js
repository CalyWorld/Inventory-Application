const Category = require("../models/category");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");

exports.item_list = asyncHandler(async (req, res, next) => {
  res.send("Get Items list");
});

exports.item_detail = asyncHandler(async (req, res, next) => {
  res.send("Get Item detail");
});

exports.item_create_get = asyncHandler(async (req, res, next) => {
  res.send("GET Form Submission on Create");
});

exports.item_create_post = asyncHandler(async (req, res, next) => {
  res.send("POST Form Submission on Create");
});

exports.item_delete_get = asyncHandler(async (req, res, next) => {
  res.send("GET Form Submission on Delete");
});

exports.item_delete_post = asyncHandler(async (req, res, next) => {
  res.send("POST Form Submission on Delete");
});

exports.item_update_get = asyncHandler(async (req, res, next) => {
  res.send("GET Form Submission on Update");
});

exports.item_update_post = asyncHandler(async (req, res, next) => {
  res.send("POST Form Submission on Update");
});
