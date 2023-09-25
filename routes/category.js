const express = require("express");
const router = express.Router();
const category_controller = require("../controllers/categoryController");

//GET CATEGORIES HOME PAGE
router.get("/", category_controller.index);

module.exports = router;
