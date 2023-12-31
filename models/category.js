const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
});

CategorySchema.virtual("url").get(function () {
  return `/${this._id}/items`;
});

module.exports = mongoose.model("Category", CategorySchema);
