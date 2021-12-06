const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const authenticate = require("../middlewares/authenticate");

//Registering an new user
router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("name is required"),
    body("email").notEmpty().withMessage("email is required"),
    body("password").notEmpty().withMessage("password is required"),
  ],
  async (request, response) => {
    let errors = validationResult(request);
    if (!errors.isEmpty())
      return response.status(400).json({ errors: [{ msg: errors.array() }] });
    try {
      let { name, email, password } = request.body;
      //find the user already registered or not
      let user = await User.findOne({ email: email });
      if (user) {
        return response
          .status(500)
          .json({ errors: [{ msg: "User exists already!" }] });
      }
      //hash the password
      let salt = await bcryptjs.genSalt(10);
      //gen salt and hast it
      password = await bcryptjs.hash(password, salt);

      //get the avatar
      let avatar = await gravatar.url(email, {
        s: 300,
        r: "pg",
        d: "mm",
      });

      // add default address
      let address = [
        {
          flat: " ",
          street: " ",
          landmark: " ",
          city: " ",
          state: " ",
          country: " ",
          pin: " ",
          mobile: " ",
        },
      ];

      //save to database
      user = new User({ name, email, password, avatar, address });
      user = await user.save();
      if (user)
        return response.status(200).json({ msg: "Registration successfull!" });
    } catch (error) {
      console.log(error);
      return response.status(500).json({ errors: [{ msg: error.message }] });
    }
  }
);

//Login new user
router.post(
  "/login",
  [
    body("email").notEmpty().withMessage("email is required"),
    body("password").notEmpty().withMessage("password is required"),
  ],
  async (request, response) => {
    let errors = validationResult(request);
    if (!errors.isEmpty())
      return response.status(500).json({ errors: [{ msg: errors.array() }] });
    try {
      let { email, password } = request.body;

      //check email is there or not
      let user = await User.findOne({ email: email });
      if (!user) {
        return response
          .status(500)
          .json({ errors: [{ msg: "Invalid Credentials!" }] });
      }

      //compare the password
      let isMatch = await bcryptjs.compare(password, user.password);
      if (!isMatch)
        return response
          .status(500)
          .json({ errors: [{ msg: "Invalid Credentials!" }] });

      //create payload and sign in wiht secretkey
      let payload = {
        user: {
          id: user.id,
          name: user.name,
        },
      };
      //return the token
      await jwt.sign(
        payload,
        process.env.JWT_SECRET_KEY,
        { expiresIn: "4h" },
        (err, token) => {
          if (err) {
            return response
              .status(500)
              .json({ errors: [{ msg: err.message }] });
          }
          return response.status(200).json({
            msg: "Login Successfull",
            token: token,
            user: user,
          });
        }
      );
    } catch (error) {
      console.log(error);
      return response.status(500).json({ errors: [{ msg: error.message }] });
    }
  }
);

//Get User Info

router.get("/", authenticate, async (request, response) => {
  try {
    let user = await User.findOne({ _id: request.user.id }).select("-password");
    if (user) {
      return response.status(200).json({ user: user });
    }
    return response
      .status(500)
      .json({ errors: [{ msg: "Unable to get user information !" }] });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ errors: [{ msg: error.message }] });
  }
});

//update address
router.post(
  "/address",
  authenticate,
  [
    body("address").notEmpty().withMessage("Address is required"),
    // body("flat").notEmpty().withMessage("Flat is required"),
    // body("street").notEmpty().withMessage("Street is required"),
    // body("landmark").notEmpty().withMessage("Landmark is required"),
    // body("city").notEmpty().withMessage("City is required"),
    // body("state").notEmpty().withMessage("State is required"),
    // body("country").notEmpty().withMessage("Country is required"),
    // body("pin").notEmpty().withMessage("Pin is required"),
    // body("address.0.mobile").notEmpty().withMessage("Mobile is required"),
  ],

  async (request, response) => {
    let errors = validationResult(request);
    console.log(errors);
    if (!errors.isEmpty()) {
      return response
        .status(500)
        .json({ errors: [{ errors: errors.array() }] });
    }

    try {
      let user = await User.findById(request.user.id);
      let { address } = request.body;

      let addressArray = [];
      address.forEach((add) => {
        let newAddress = {
          flat: add.flat,
          street: add.street,
          country: add.country,
          pin: add.pin,
          state: add.state,
          landmark: add.landmark,
          city: add.city,
          mobile: add.mobile,
        };
        addressArray.push(newAddress);
      });
      user.address = addressArray;

      user = await user.save();
      if (user)
        return response
          .status(201)
          .json({ msg: "Adddress updated !", user: user });
    } catch (error) {
      console.log(error);
      return response.status(500).json({ errors: [{ msg: error.message }] });
    }
  }
);

module.exports = router;
