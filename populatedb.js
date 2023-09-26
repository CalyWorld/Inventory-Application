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

const mongoDB = process.env.MONGODB_URI;
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
    categoriesCreate(
      0,
      "All Automotives",
      "Automotives used for transportation",
    ),
    categoriesCreate(
      1,
      "All Apparels",
      "Clothes you can wear and feel comfortable",
    ),
    categoriesCreate(
      2,
      "All Electronics",
      "Devices you can use to work around, used for leisure and work purposes",
    ),
    categoriesCreate(
      3,
      "All Home Appliances",
      "Appliances found in your home and makes life much easier",
    ),
  ]);
}

async function createItems() {
  console.log("Adding items");
  // Automotives
  await itemsCreate(
    3,
    "Sedan Car",
    "Luxury sedan with leather seats",
    25000,
    3,
    categories[0],
    "https://imgd.aeplcdn.com/600x337/n/cw/ec/134287/2023-city-exterior-right-front-three-quarter.jpeg?isig=0&q=80",
  );
  await itemsCreate(
    4,
    "Motorbike",
    "Powerful motorbike with ABS",
    8000,
    8,
    categories[0],
    "https://images.opumo.com/wordpress/wp-content/uploads/2023/02/Harley-1200x598.jpg",
  );
  await itemsCreate(
    5,
    "Bicycle",
    "Mountain bike with 21 gears",
    500,
    20,
    categories[0],
    "https://i5.walmartimages.com/asr/ad6dd7d8-7599-4702-99b2-192497648d9c_1.4a3db4004eb4c61243c497998f78e0bc.jpeg",
  );

  // Apparels
  await itemsCreate(
    6,
    "T-Shirt",
    "Cotton graphic t-shirt",
    20,
    50,
    categories[1],
    "https://cottonon.com/dw/image/v2/BBDS_PRD/on/demandware.static/-/Sites-catalog-master-men/default/dw31b9cd14/3612084/3612084-14-2.jpg?sw=400&sh=600&sm=fit",
  );
  await itemsCreate(
    7,
    "Jeans",
    "Slim-fit denim jeans",
    50,
    40,
    categories[1],
    "https://ph-test-11.slatic.net/p/1470a252f1958afdfb97955eaecf4b18.png",
  );
  await itemsCreate(
    8,
    "Sneakers",
    "Unisex running shoes",
    60,
    30,
    categories[1],
    "https://underarmour.scene7.com/is/image/Underarmour/3027082-100_PAIR?rp=standard-30pad|pdpMainDesktop&scl=1&fmt=jpg&qlt=85&resMode=sharp2&cache=on,on&bgc=f0f0f0&wid=566&hei=708&size=536,688",
  );
  // Electronics
  await itemsCreate(
    0,
    "Laptop",
    "High-end gaming laptop",
    1000,
    5,
    categories[2],
    "https://www.yugatech.com/wp-content/uploads/2016/01/lenovo-y70_1.png",
  );
  await itemsCreate(
    1,
    "Smartphone",
    "Latest model with OLED screen",
    800,
    10,
    categories[2],
    "https://image.made-in-china.com/202f0j00yhElNfePMmvK/2023-Hot-Sell-S23-Ultra-Smartphone-Android-16GB-1tb-7-2-Inch-Original-Unlock-OLED-Screen-Dual-SIM-5g-Mobile-Phones.webp",
  );
  await itemsCreate(
    2,
    "Headphones",
    "Noise-canceling over-ear headphones",
    200,
    15,
    categories[2],
    "https://lzd-img-global.slatic.net/g/p/de71ad5295628dd23415554a469fa079.jpg_720x720q80.jpg",
  );

  // Home Appliances
  await itemsCreate(
    9,
    "Refrigerator",
    "Double door frost-free refrigerator",
    800,
    10,
    categories[3],
    "https://5.imimg.com/data5/IE/ME/WK/SELLER-11959197/lg-t432fbln-437-l-inverter-frost-free-double-door-refrigerator-500x500.jpg",
  );
  await itemsCreate(
    10,
    "Washing Machine",
    "Front-load washing machine with dryer",
    500,
    8,
    categories[3],
    "https://www.lg.com/ph/images/washing-machines/md05826209/gallery/D06.jpg",
  );
  await itemsCreate(
    11,
    "Microwave Oven",
    "Convection microwave oven",
    150,
    12,
    categories[3],
    "https://cdn11.bigcommerce.com/s-dj46qhetxl/images/stencil/1280x1280/products/123774/296510/460743be47881fe85f8a0cb1f60683479a62394a__32609.1679109803.jpg?c=1",
  );
}
