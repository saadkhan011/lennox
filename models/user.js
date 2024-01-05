const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: false,
    },
    lastname: {
      type: String,
      required: false,
    }
  },

  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
