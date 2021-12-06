const mongoose = require("mongoose");

let productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    usage: { type: String, required: true },
  },
  { timestamps: true }
);

let Product = mongoose.model("Product", productSchema);

module.exports = Product;
