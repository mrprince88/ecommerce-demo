const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const product = require("../data");

dotenv.config();

//get cart for user
router.get("/cart", authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    res.json(user.cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//add in cart
router.put("/cart", authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    await user.updateOne({
      $push: {
        cart: {
          id: req.body.id,
          img: req.body.img,
          price: req.body.price,
        },
      },
    });
    res.json("added successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete from cart
router.delete("/cart", authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    await user.updateOne({
      $set: {
        cart: user.cart.filter((val) => val._id.toString() !== req.body.id),
      },
    });
    res.json("deleted successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});

//place order

router.put("/placeorder", authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    console.log(user);
    await user.updateOne({
      $push: {
        orders: {
          items: req.body.items,
          price: req.body.price,
        },
      },
    });
    res.json("Order placed sucessfully");
  } catch (err) {
    res.status(500).json(err);
  }
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = router;
