const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema(
  {
    tokenUser: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const TokenModel = mongoose.model("token", tokenSchema);

module.exports = TokenModel;
