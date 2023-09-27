const express = require("express");
const router = express.Router();
const category_controller = require("../controllers/categoryController");
const item_controller = require("../controllers/itemController");

//GET CATEGORIES HOME PAGE
router.get("/", category_controller.index);
router.get("/category", category_controller.category_list);
router.get("/category/create", category_controller.category_create_get);
router.post("/category/create", category_controller.category_create_post);
router.get("/category/:id/delete", category_controller.category_delete_get);
router.post("/category/:id/delete", category_controller.category_delete_post);
router.get("/category/:id/update", category_controller.category_update_get);
router.post("/category/:id/update", category_controller.category_update_post);
router.get("/category/:id", category_controller.category_detail);

//Item Routes
router.get("/category/:categoryId/item", item_controller.item_list);
router.get(
  "/category/:categoryId/item/create",
  item_controller.item_create_get,
);
router.post(
  "/category/:categoryId/item/create",
  item_controller.item_create_post,
);
router.get(
  "/category/:categoryId/item/:itemId/delete",
  item_controller.item_delete_get,
);
router.post(
  "/category/:categoryId/item/:itemId/delete",
  item_controller.item_delete_post,
);
router.get(
  "/category/:categoryId/item/:itemId/update",
  item_controller.item_update_get,
);
router.post(
  "/category/:categoryId/item/:itemId/update",
  item_controller.item_update_post,
);
router.get("/category/:categoryId/item/:itemId", item_controller.item_detail);

module.exports = router;
