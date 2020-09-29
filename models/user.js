const mongoose = require("mongoose");

const user = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username can not be blank"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password can not be blank"],
      validate: [({ length }) => length >= 4, "Password should be longer."],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", user);
