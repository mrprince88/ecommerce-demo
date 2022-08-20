const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    cart: [
      {
        id: {
          type: Number,
        },
        img: {
          type: String,
        },
        price: {
          type: String,
        },
      },
    ],
    orders: [],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
