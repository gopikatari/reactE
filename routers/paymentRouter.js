const express = require("express");
const authenticate = require("../middlewares/authenticate");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

router.post("/pay", authenticate, (request, response) => {
  const { product, token } = request.body;

  stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) =>
      stripe.charges.create({
        amount: product.price,
        description: product.name,
        currency: "INR",
        customer: customer.id,
      })
    )
    .then((charge) => response.status(200).json(charge))
    .catch((err) => console.log(err));
});
module.exports = router;
