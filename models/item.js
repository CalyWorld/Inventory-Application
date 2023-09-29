const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  imageUrl: { type: String },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
});

ItemSchema.virtual("url").get(function () {
  return `/${this.category}/`;
});

module.exports = mongoose.model("Item", ItemSchema);
