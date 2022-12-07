const UserModel = require("../models/user.model");
const ObjectId = require("mongoose").Types.ObjectId;

//Get all users
module.exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await UserModel.find().select("-password");
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(400).json(err);
  }
};

//Update single user
module.exports.getOneUser = async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id))
    return res.status(400).json({ message: "ID inconnu " + id });

  try {
    const userInfo = await UserModel.findById(id).select("-password");
    res.status(200).json(userInfo);
  } catch (error) {
    res.status(400).send(error);
  }
};

//Get user info by this e-mail
module.exports.getMail = async (req, res) => {
  const { mail } = req.params;

  try {
    const userInfo = await UserModel.findOne({ email: mail }).select(
      "-password"
    );
    res.status(200).json(userInfo);
  } catch (error) {
    res.status(400).send(error);
  }
};

//Update a specific user
module.exports.updateUser = async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id))
    return res.status(400).json({ message: "ID inconnu " + id });

  const userFind = await UserModel.findById(id);
  const profi = userFind.profil;
  const lastnam = userFind.lastname;
  const firstnam = userFind.firstname;
  const phon = userFind.phone;
  const addres = userFind.address;
  const cur = userFind.currency;
  // const payMeth = userFind.paymentMethod;
  const curMethode = userFind.currencymethod;
  const emailCur = userFind.emailCurrencyEuro;
  const ibanCur = userFind.ibanCurrency;
  const paylibCurLast = userFind.paylibcurencyLastname;
  const paylibCurFirst = userFind.paylibcurencyFirstname;
  const paylibCurTel = userFind.paylibcurencyTel;
  const dhsBa = userFind.dhsBank;
  const dhsBankFirst = userFind.dhsBankFirstname;
  const dhsBankLast = userFind.dhsBankLastname;
  const dhsRi = userFind.dhsRib;
  const usdtPayEmail = userFind.usdtPaymentEmail;
  const usdtAdreTrx = userFind.usdtAdressTrx;
  const payeerAcc = userFind.payeeraccount;

  try {
    const userUpdating = await UserModel.findByIdAndUpdate(
      id,
      {
        $set: {
          profil: req.body.profil ? req.body.profil : profi,
          lastname: req.body.lastname ? req.body.lastname : lastnam,
          firstname: req.body.firstname ? req.body.firstname : firstnam,
          phone: req.body.phone ? req.body.phone : phon,
          address: req.body.address ? req.body.address : addres,
          currency: req.body.currency ? req.body.currency : cur,
          // paymentMethod: req.body.paymentMethod
          //   ? req.body.paymentMethod
          //   : payMeth,
          currencymethod: req.body.currencymethod
            ? req.body.currencymethod
            : curMethode,
          emailCurrencyEuro: req.body.emailCurrencyEuro
            ? req.body.emailCurrencyEuro
            : emailCur,
          ibanCurrency: req.body.ibanCurrency ? req.body.ibanCurrency : ibanCur,
          paylibcurencyLastname: req.body.paylibcurencyLastname
            ? req.body.paylibcurencyLastname
            : paylibCurLast,
          paylibcurencyFirstname: req.body.paylibcurencyFirstname
            ? req.body.paylibcurencyFirstname
            : paylibCurFirst,
          paylibcurencyTel: req.body.paylibcurencyTel
            ? req.body.paylibcurencyTel
            : paylibCurTel,
          dhsBank: req.body.dhsBank ? req.body.dhsBank : dhsBa,
          dhsBankFirstname: req.body.dhsBankFirstname
            ? req.body.dhsBankFirstname
            : dhsBankFirst,
          dhsBankLastname: req.body.dhsBankLastname
            ? req.body.dhsBankLastname
            : dhsBankLast,
          dhsRib: req.body.dhsRib ? req.body.dhsRib : dhsRi,
          usdtPaymentEmail: req.body.usdtPaymentEmail
            ? req.body.usdtPaymentEmail
            : usdtPayEmail,
          usdtAdressTrx: req.body.usdtAdressTrx
            ? req.body.usdtAdressTrx
            : usdtAdreTrx,
          payeeraccount: req.body.payeeraccount
            ? req.body.payeeraccount
            : payeerAcc,
        },
      },
      {
        new: true,
        upsert: true,
      }
    );

    res.status(200).json(userUpdating);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports.deleteUserByAdmin = async (req, res) => {
  const { email } = req.params;
  try {
    const userDeletedByAdmin = await UserModel.deleteOne({ email: email });
    res.status(200).json(userDeletedByAdmin);
  } catch (error) {
    res.status(400).json(error);
  }
};

//Delete a specific user
module.exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id))
    return res.status(400).json({ message: "ID inconnu " + id });

  try {
    const userDeleted = await UserModel.findByIdAndDelete(id);
    res.status(200).json(userDeleted);
  } catch (error) {
    res.status(400).json(error);
  }
};

//Get all users stats
module.exports.getStats = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await UserModel.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};
