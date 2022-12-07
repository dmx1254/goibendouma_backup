const mongoose = require("mongoose");

const exchangeSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    numExchange: {
      type: String,
      required: true,
    },
    serverOut: {
      type: String,
      required: true,
    },

    qtyToPay: {
      type: Number,
      required: true,
    },

    characterToPay: {
      type: String,
      required: true,
    },
    serverIn: {
      type: String,
      required: true,
    },
    qtyToReceive: {
      type: Number,
      required: true,
    },
    characterToReceive: {
      type: String,
      required: true,
    },

    codeToExchange: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "En attente",
    },
    nameExchanger: {
      type: String,
    },

    emailExchanger: {
      type: String,
    },
    profilExchanger: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const ExchangeModel = mongoose.model("exchange", exchangeSchema);

module.exports = ExchangeModel;
