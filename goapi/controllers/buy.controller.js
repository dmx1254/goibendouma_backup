const BuyModel = require("../models/buy.model");

const ObjectId = require("mongoose").Types.ObjectId;

module.exports.createBuy = async (req, res) => {
  const {
    userId,
    numBuy,
    jeu,
    server,
    pu,
    qte,
    totalPrice,
    paymentMethod,
    status,
  } = req.body;

  try {
    const createdBuy = await BuyModel.create({
      userId,
      numBuy,
      jeu,
      server,
      pu,
      qte,
      totalPrice,
      paymentMethod,
      status,
    });
    res.status(200).json(createdBuy);
  } catch (error) {
    console.log(error);
  }
};

module.exports.getAllBuy = async (req, res) => {
  try {
    const allBuy = await BuyModel.find().sort({ createdAt: -1 });
    res.status(200).json(allBuy);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.getOneBuy = async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id))
    return res.status(400).json({ message: "ID inconnu" });

  try {
    const findingBuy = await BuyModel.findById(id);
    res.status(200).json(findingBuy);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.updateBuy = async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id))
    return res.status(400).json({ message: "ID inconnu" });

  try {
    const updatedBuy = await BuyModel.findByIdAndUpdate(
      id,
      {
        $set: {
          status: req.body.status,
        },
      },
      {
        new: true,
        upsert: true,
      }
    );

    res.status(200).json(updatedBuy);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.findBuyUsers = async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id))
    return res.status(400).json({ message: "ID inconnu" });

  try {
    const allUsersBuy = await BuyModel.find({ userId: id }).sort({
      createdAt: -1,
    });
    res.status(200).json(allUsersBuy);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.deleteBuy = async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id))
    return res.status(400).json({ message: "ID inconnu" });

  try {
    const buyDeleted = await BuyModel.findByIdAndDelete(id);
    res.status(200).json(buyDeleted);
  } catch (error) {
    res.status(200).json(error);
  }
};
