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
      const category_list = await Category.find().exec();
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
  const category_item = await Item.findById(req.params.itemId)
    .populate("category")
    .exec();
  const category_list = await Category.find({}, "name").exec();
  if (category_item === null) {
    res.redirect("/");
  }
  res.render("item_delete", {
    category_item: category_item,
    category_list: category_list,
  });
});

exports.item_delete_post = asyncHandler(async (req, res, next) => {
  const category = await Item.findById(req.params.itemId)
    .populate("category")
    .exec();
  let category_items = category.category;
  await Item.findByIdAndRemove(req.params.itemId);
  res.redirect(category_items.url);
});

exports.item_update_get = asyncHandler(async (req, res, next) => {
  const [category_item, category_list] = await Promise.all([
    Item.findById(req.params.itemId),
    Category.find().exec(),
  ]);
  res.render("item_form", {
    title: "Create an Item",
    category_list: category_list,
    item: category_item,
  });
});

exports.item_update_post = [
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
    let item = new Item({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
      imageUrl: req.body.imageUrl,
      category: req.body.category,
      _id: req.params.itemId,
    });
    if (!errors.isEmpty()) {
      const category_list = await Category.find().exec();
      res.render("item_form", {
        title: "Create an Item",
        category_list: category_list,
        item: item,
        errors: errors.array(),
      });
    } else {
      const updatedItem = await Item.findByIdAndUpdate(
        req.params.itemId,
        item,
        {},
      );
      res.redirect(updatedItem.url);
      console.log(category_list, item);
    }
  }),
];
