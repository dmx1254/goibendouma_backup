const UserModel = require("../models/user.model");
// const CodeModel = require("../models/code.models");
const TokenModel = require("../models/token.models");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const sendEmailForgotPassword = require("../utils/emailForgotPassword");

//All my errors functions displaying when sign in or sign up errors
// const { signUpErrors, signInErrors } = require("../utils/errors.utils");

//Define duration of the valid token
const maxAge = 30 * 24 * 60 * 60 * 1000;

//Function creating token with json web token
const createToken = (id, admin) => {
  return jwt.sign({ id, admin }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

//Users creating and saving in my database function
module.exports.signUp = async (req, res) => {
  const {
    email,
    password,
    currency,
    currencymethod,
    emailCurrencyEuro,
    ibanCurrency,
    paylibcurencyLastname,
    paylibcurencyFirstname,
    paylibcurencyTel,
    dhsBank,
    dhsBankFirstname,
    dhsBankLastname,
    dhsRib,
    usdtPaymentEmail,
    usdtAdressTrx,
    cnyacount,
    payeeraccount,
    isAdmin,
    moderator,
    profil,
    lastname,
    firstname,
    phone,
    address,
    country,
    city,
  } = req.body;

  try {
    const userCreated = await UserModel.create({
      email,
      password,
      currency,
      currencymethod,
      emailCurrencyEuro,
      ibanCurrency,
      paylibcurencyLastname,
      paylibcurencyFirstname,
      paylibcurencyTel,
      dhsBank,
      dhsBankFirstname,
      dhsBankLastname,
      dhsRib,
      usdtPaymentEmail,
      usdtAdressTrx,
      cnyacount,
      payeeraccount,
      isAdmin,
      moderator,
      profil,
      lastname,
      firstname,
      phone,
      address,
      country,
      city,
    });
    res.status(200).json(userCreated);
  } catch (err) {
    res.status(200).json(err);
  }
};

//Users login function
module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id, user.isAdmin);
    res.cookie("jwt", token, { httpOnly: true, maxAge });
    res.status(200).json({ user: user._id, person: user });
  } catch (error) {
    // const errors = signInErrors(error);
    res.status(200).json({ message: "Email ou mot de passe incorrect" });
  }
};

module.exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  const userVerifyBYEmail = await UserModel.findOne({ email: email });

  if (!userVerifyBYEmail) return res.status(200).json({ message: false });

  try {
    // const forgotToken = await jwt.sign(
    //   { email: userVerifyBYEmail.email, id: userVerifyBYEmail._id },
    //   process.env.TOKEN_SECRET_FORGOTPASSWORD,
    //   { expiresIn: "1h" }
    // );
    res.status(200).json({ message: true });
    // const verified = await TokenModel.create({
    //   tokenUser: forgotToken,
    //   email: email,
    // });
    // const link = `http://localhost:5000/api/users/reset-password/${userVerifyBYEmail._id}/${forgotToken}`;
    // await sendEmailForgotPassword(email, link);
    // res.status(200).json({
    //   token: verified,
    //   message: "Link sent to " + email,
    // });
  } catch (error) {
    res.status(400).json(error);
  }
};

// module.exports.resetPassword = async (req, res) => {
//   const { id, tokenId } = req.params;

//   console.log("id: " + id, "token " + tokenId);

//   try {
//     const userVerified = await UserModel.findOne({ _id: id });
//     if (!userVerified)
//       return res.status(400).json({ message: "utilisateur inconnu" });

//     const verifiedToken = await jwt.verify(
//       tokenId,
//       process.env.TOKEN_SECRET_FORGOTPASSWORD
//     );
//     if (!verifiedToken)
//       return res.status(400).json({ message: "votre token est invalide" });

//     res.status(200).json({ message: "utilisateur verifié" });
//   } catch (error) {
//     res.status(400).json({ message: "Utilisateur inconnu" });
//   }
// };

module.exports.createNewPassword = async (req, res) => {
  const { email, password } = req.body;
  const userVerifiedByEmail = await UserModel.findOne({ email: email });
  if (!userVerifiedByEmail)
    return res.status(400).json({ message: "Utilisateur inconnu" });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const userPasswordUpdated = await UserModel.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );

    res.status(200).json({
      message:
        "Mot de passe réinitialisé avec succès, vous pouvez maintenant vous connecter",
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

//Function to logout
//Function to logout
module.exports.logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).json("Successfully logout");
  } catch (error) {
    res.status(400).json(error);
  }
};
