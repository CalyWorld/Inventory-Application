const express = require("express");
const router = express.Router();
const category_controller = require("../controllers/categoryController");
const item_controller = require("../controllers/itemController");

//GET CATEGORIES HOME PAGE
router.get("/", category_controller.index);
router.get("/category/create", category_controller.category_create_get);
router.post("/category/create", category_controller.category_create_post);
router.get("/:id", category_controller.category_detail);
router.get("/:id/delete", category_controller.category_delete_get);
router.post("/:id/delete", category_controller.category_delete_post);
router.get("/:id/update", category_controller.category_update_get);
router.post("/:id/update", category_controller.category_update_post);

//Item Routes
router.get("/item/create", item_controller.item_create_get);
router.post("/item/create", item_controller.item_create_post);
router.get("/:categoryId/:itemId/delete", item_controller.item_delete_get);
router.post("/:categoryId/:itemId/delete", item_controller.item_delete_post);
router.get("/:categoryId/:itemId/update", item_controller.item_update_get);
router.post("/:categoryId/:itemId/update", item_controller.item_update_post);

module.exports = router;
