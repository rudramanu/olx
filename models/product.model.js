const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  name: String,
  description: String,
  category: String,
  image: String,
  location: String,
  date: Date,
  price: Number,
});
const ProductModel = mongoose.model("product", productSchema);

module.exports = { ProductModel };
