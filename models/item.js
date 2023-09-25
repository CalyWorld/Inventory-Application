const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
});

module.exports = mongoose.model("Item", itemSchema);