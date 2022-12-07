const mongoose = require("mongoose");

const tauxSchema = new mongoose.Schema(
  {
    rate: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const RateModel = mongoose.model("rate", tauxSchema);
module.exports = RateModel;
