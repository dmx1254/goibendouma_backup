const mongoose = require("mongoose");

const soldeSchema = new mongoose.Schema(
  {
    solde: {
      type: String,
      required: true,
    },
    priceDh: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SoldeModel = mongoose.model("solde", soldeSchema);

module.exports = SoldeModel;
