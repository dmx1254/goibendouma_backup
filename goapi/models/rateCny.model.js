const mongoose = require("mongoose");

const cnySchema = new mongoose.Schema(
  {
    cny: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const RateCnyModel = mongoose.model("cny", cnySchema);

module.exports = RateCnyModel;
