// checkEmail model creating with mongoose
const mongoose = require("mongoose");
const { isEmail } = require("validator");

const checkEmailSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      validate: [isEmail],
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

const EmailModel = mongoose.model("emailverify", checkEmailSchema);

module.exports = EmailModel;
