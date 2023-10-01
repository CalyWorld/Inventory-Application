const Category = require("../models/category");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.index = asyncHandler(async (req, res, next) => {
  const category_list = await Category.find({}, "name").exec();
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
    category_list: category_list,
  });
});

exports.category_list = asyncHandler(async (req, res, next) => {
  const category_list = await Category.find({}, "name").exec();
  res.render("layout", {
    category_list: category_list,
  });
});

exports.category_items = asyncHandler(async (req, res, next) => {
  const [category, category_item] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }).exec(),
  ]);
  res.render("category_items", {
    category: category,
    category_item: category_item,
  });
});

exports.category_create_get = asyncHandler(async (req, res, next) => {
  res.render("category_form", {
    title: "Create Category",
  });
});

exports.category_create_post = [
  body("name", "Name must not be empty").trim().isLength({ min: 1 }).escape(),
  body("description", "Description must not be empty")
    .trim()
    .isLength({ min: 10 })
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const category = new Category({
      name: req.body.name,
      description: req.body.description,
    });
    if (!errors.isEmpty()) {
      const category = await Category.find().exec();
      res.render("category_form", {
        title: "Create Category",
        category: category,
        errors: errors.array(),
      });
    } else {
      await category.save();
      res.redirect(category.url);
    }
  }),
];

exports.category_delete_get = asyncHandler(async (req, res, next) => {
  const [category, category_items] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }).populate("category").exec(),
  ]);
  if (category === null) {
    res.redirect("/");
  }
  res.render("category_delete", {
    category: category,
    category_items: category_items,
  });
});

exports.category_delete_post = asyncHandler(async (req, res, next) => {
  const [category, category_items] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }).populate("category").exec(),
  ]);
  if (category_items.length > 0) {
    res.render("category_delete", {
      category: category,
      category_items: category_items,
    });
  } else {
    await Category.findByIdAndRemove(req.body.categoryid);
    res.redirect("/");
  }
});

exports.category_update_get = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id).exec();

  if (category === null) {
    const err = new Error("Category not found");
    err.status = 404;
    return next(err);
  }
  res.render("category_form", {
    category: category,
  });
});

exports.category_update_post = [
  body("name", "Name must not be empty").trim().isLength({ min: 1 }).escape(),
  body("description", "Description must not be empty")
    .trim()
    .isLength({ min: 10 })
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const category = new Category({
      name: req.body.name,
      description: req.body.description,
      _id: req.params.id,
    });
    if (!errors.isEmpty()) {
      const category = await Category.find().exec();
      res.render("category_form", {
        title: "Create Category",
        category: category,
        errors: errors.array(),
      });
    } else {
      const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        category,
        {},
      );
      res.redirect(updatedCategory.url);
    }
  }),
];
