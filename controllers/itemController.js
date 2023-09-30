const Category = require("../models/category");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.item_create_get = asyncHandler(async (req, res, next) => {
  const category_list = await Category.find().exec();
  res.render("item_form", {
    title: "Create an Item",
    category_list: category_list,
  });
});

exports.item_create_post = [
  body("name", "name must not be empty").trim().isLength({ min: 1 }).escape(),
  body("category", "Category must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("description", "Description must not be empty")
    .trim()
    .isLength({ min: 5 })
    .escape(),
  body("price", "Price must not be empty").isInt({ gt: 0 }),
  body("quantity", "Quantity must not be empty").isInt({ gt: 0 }),
  body("imageUrl", "URL must not be empty").trim().isLength({ min: 1 }),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const category_list = await Category.find().exec();
    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
      imageUrl: req.body.imageUrl,
      category: req.body.category,
    });
    if (!errors.isEmpty()) {
      res.render("item_form", {
        title: "Create an Item",
        category_list: category_list,
        item: item,
        errors: errors.array(),
      });
    } else {
      await item.save();
      res.redirect(item.url);
      console.log(category_list, item);
    }
  }),
];

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
