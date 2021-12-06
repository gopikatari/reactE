const mongoose = require("mongoose");

let orderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    items: [
      {
        name: { type: String, required: true },
        brand: { type: String, required: true },
        qty: { type: String, required: true },
        price: { type: String, required: true },
      },
    ],
    tax: { type: Number, required: true },
    total: { type: Number, required: true },
  },
  { timestamps: true }
);

let Order = mongoose.model("Order", orderSchema);

module.exports = Order;
