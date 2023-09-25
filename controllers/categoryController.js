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
