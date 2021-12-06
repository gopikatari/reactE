const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const authenticate = require("../middlewares/authenticate");
const User = require("../models/user");
const Order = require("../models/order");

//creating an order
router.post(
  "/",
  authenticate,
  [
    body("items").notEmpty().withMessage("items required"),
    body("tax").notEmpty().withMessage("items required"),
    body("total").notEmpty().withMessage("total is required"),
  ],
  async (request, response) => {
    let errors = validationResult(request);
    if (!errors.isEmpty())
      return response.status(500).json({ errors: errors.array() });

    //get the user from token
    let userid = request.user.id;
    let user = await User.findById(userid);
    let newOrder = {
      name: user.name,
      email: user.email,
      mobile: user.address[0].mobile,
      items: request.body.items,
      tax: request.body.tax,
      total: request.body.total,
    };
    let order = new Order(newOrder);
    order = await order.save();
    if (order)
      response
        .status(200)
        .json({ order: order, msg: "Order created successfully!" });
    try {
    } catch (error) {
      console.log(error);
      response.status(500).json({ errors: [{ msg: error.message }] });
    }
  }
);

router.get("/allOrders", authenticate, async (request, response) => {
  try {
    let user = await User.findById(request.user.id);
    let orders = await Order.find({ email: user.email });

    return response.status(200).json({ orders: orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
});
module.exports = router;
