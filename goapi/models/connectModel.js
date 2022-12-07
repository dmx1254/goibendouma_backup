const mongoose = require("mongoose");

const connectSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    lastname: {
      type: String,
      required: true,
    },

    firstname: {
      type: String,
      required: true,
    },

    dateToConnect: {
      type: String,
      required: true,
    },

    dateToDisconnect: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const ConnectModel = mongoose.model("userconnect", connectSchema);

module.exports = ConnectModel;
