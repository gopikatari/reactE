const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");
const { body, validationResult } = require("express-validator");
const Product = require("../models/product");
const Category = require("../models/category");

//update product

router.post(
  "/",
  authenticate,
  [
    body("name").notEmpty().withMessage("name is required"),
    body("brand").notEmpty().withMessage("brand is required"),
    body("price").notEmpty().withMessage("price is required"),
    body("qty").notEmpty().withMessage("quantity is required"),

    body("image").notEmpty().withMessage("image is required"),
    body("category").notEmpty().withMessage("category is required"),
    body("description").notEmpty().withMessage("description is required"),
    body("usage").notEmpty().withMessage("usage is required"),
  ],
  async (request, response) => {
    let errors = validationResult(request);
    if (!errors.isEmpty())
      return response.status(500).json({ errors: errors.array() });
    try {
      let { name, image, price, qty, category, description, brand, usage } =
        request.body;
      let product = new Product({
        name,
        brand,
        image,
        price,
        qty,
        category,
        description,
        usage,
      });
      product = await product.save();

      if (product)
        return response
          .status(200)
          .json({ msg: "Product created successfully !" });
    } catch (error) {
      console.log(error);
      return response.status(500).json({ errors: [{ msg: error.message }] });
    }
  }
);

//get Mens Products
router.get("/mens", async (request, response) => {
  try {
    let mensProducts = await Product.find({ category: "MENS" });
    return response.status(200).json({ products: mensProducts });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ errors: [{ msg: error.message }] });
  }
});

//get womens Products

router.get("/womens", async (request, response) => {
  try {
    let womensProducts = await Product.find({ category: "WOMENS" });
    return response.status(200).json({ products: womensProducts });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ errors: [{ msg: error.message }] });
  }
});

//get kids Products

router.get("/kids", async (request, response) => {
  try {
    let kidsProducts = await Product.find({ category: "KIDS" });
    return response.status(200).json({ products: kidsProducts });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ errors: [{ msg: error.message }] });
  }
});

//get  Products by category

router.get("/productlist/:category", async (request, response) => {
  try {
    let products = await Product.find({ category: request.params.category });
    return response.status(200).json({ products: products });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ errors: [{ msg: error.message }] });
  }
});

router.get("/allcategories", async (request, response) => {
  try {
    let allCat = await Category.find();
    return response.status(200).json({ categories: allCat });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ errors: [{ msg: error.message }] });
  }
});

//get single product

router.get("/:product_id", async (request, response) => {
  try {

    let product = await Product.findById(request.params.product_id);
    if (product) {
      return response.status(200).json({ product: product });
    }
    return response
      .status(500)
      .json({ errors: [{ msg: "invalid productid!" }] });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ errors: [{ msg: error.message }] });
  }
});

router.post(
  "/addCategory",
  authenticate,
  [body("name").notEmpty().withMessage("name is required")],
  async (request, response) => {
    let errors = validationResult(request);
    if (!errors.isEmpty())
      return response.status(500).json({ errors: errors.array() });
    try {
      //check category exists or not by name
      let allCategories = await Category.find();

      if (allCategories) {
        allCategories.forEach((category) => {
          if (category.name.toLowerCase() === request.body.name.toLowerCase()) {
            return response
              .status(500)
              .json({ errors: [{ msg: "Category exists already!" }] });
          }
        });
      }
      let category = { name: request.body.name };
      category = new Category(category);
      category = await category.save();
      if (category)
        return response
          .status(200)
          .json({ msg: "category created successfully !" });
    } catch (error) {
      console.log(error);
      return response.status(500).json({ errors: [{ msg: error.message }] });
    }
  }
);

module.exports = router;
