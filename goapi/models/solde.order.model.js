const mongoose = require("mongoose");

const soldeOrderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      trim: true,
    },
    numSolde: {
      type: String,
      required: true,
    },
    solde: {
      type: String,
      required: true,
    },

    qte: {
      type: Number,
      required: true,
    },

    pu: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
    },

    status: {
      type: String,
      default: "En cours de paiement",
    },
  },
  {
    timestamps: true,
  }
);

const SoldeOrderModel = mongoose.model("soldeorder", soldeOrderSchema);

module.exports = SoldeOrderModel;
