const router = require("express").Router();
const dotenv = require("dotenv");
const products = require("../data");

dotenv.config();

//get products
router.get("/", async (req, res) => {
  try {
    res.json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
