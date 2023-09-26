#! /usr/bin/env node

console.log(
  'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"',
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);
require("dotenv").config();

const Category = require("./models/category");
const Items = require("./models/item");

const categories = [];
const items = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = process.env.mongoDB_URI;
main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createCategories();
  await createItems();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function categoriesCreate(index, name, description) {
  const category = new Category({
    name: name,
    description: description,
  });
  await category.save();
  categories[index] = category;
  console.log(`Added Category: ${(name, description)}`);
}

async function itemsCreate(
  index,
  name,
  description,
  price,
  quantity,
  category,
  imageUrl,
) {
  const itemDetail = {
    name: name,
    description: description,
    price: price,
    quantity: quantity,
    category: category,
    imageUrl: imageUrl,
  };
  const item = new Items(itemDetail);
  await item.save();
  items[index] = item;
  console.log(`Added item: ${name} ${description} ${price} ${quantity}`);
}

async function createCategories() {
  console.log("Adding categories");
  await Promise.all([
    categoriesCreate(1, "All Automotives"),
    categoriesCreate(2, "All Apparels"),
    categoriesCreate(3, "All Home Appliances"),
    categoriesCreate(0, "All Electronics"),
  ]);
}

async function createItems() {
  console.log("Adding items");
  await Promise.all([itemsCreate()]);
}
