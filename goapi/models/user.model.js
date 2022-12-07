const mongoose = require("mongoose");

// users model creating with mongoose

const bcrypt = require("bcrypt");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      validate: [isEmail],
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      max: 1024,
    },
    currency: {
      type: String,
      required: true,
    },

    currencymethod: {
      type: String,
      require: true,
    },
    emailCurrencyEuro: {
      type: String,
    },

    ibanCurrency: {
      type: String,
    },

    paylibcurencyLastname: {
      type: String,
    },
    paylibcurencyFirstname: {
      type: String,
    },

    paylibcurencyTel: {
      type: String,
    },

    dhsBank: {
      type: String,
    },
    dhsBankFirstname: {
      type: String,
    },

    dhsBankLastname: {
      type: String,
    },

    dhsRib: {
      type: String,
    },

    usdtPaymentEmail: {
      type: String,
    },

    usdtAdressTrx: {
      type: String,
    },
    payeeraccount: {
      type: String,
    },
    cnyaccount: {
      type: String,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
    moderator: {
      type: Boolean,
      default: false,
    },

    profil: {
      type: String,
    },
    lastname: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    } else {
      res.status(200).json({ message: "Mot de passe inconnu" });
    }
  } else {
    res.status(200).json({ message: "Utilisateur inconnu" });
  }
};

const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
