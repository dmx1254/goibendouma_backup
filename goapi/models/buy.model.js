const mongoose = require("mongoose");

const buySchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    numBuy: {
      type: String,
      required: true,
    },
    jeu: {
      type: String,
      required: true,
    },

    server: {
      type: String,
      required: true,
    },

    pu: {
      type: Number,
      required: true,
    },
    qte: {
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

    // capture: {
    //   type: String,
    // },

    status: {
      type: String,
      default: "En cours de paiement",
    },
  },
  {
    timestamps: true,
  }
);

const BuySchema = mongoose.model("buy", buySchema);

module.exports = BuySchema;
