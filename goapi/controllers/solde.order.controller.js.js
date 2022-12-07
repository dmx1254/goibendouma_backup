const SoldeOrderModel = require("../models/solde.order.model");

const ObjectId = require("mongoose").Types.ObjectId;

module.exports.createOrderSolde = async (req, res) => {
  const {
    userId,
    numSolde,
    solde,
    qte,
    pu,
    totalPrice,
    paymentMethod,
    status,
  } = req.body;
  try {
    const soldeOrder = await SoldeOrderModel.create({
      userId,
      numSolde,
      solde,
      qte,
      pu,
      totalPrice,
      paymentMethod,
      status,
    });
    res.status(200).json(soldeOrder);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.getAllOrdersSolde = async (req, res) => {
  try {
    const allSoldeOrder = await SoldeOrderModel.find().sort({ createdAt: -1 });
    res.status(200).json(allSoldeOrder);
  } catch (error) {
    res.status(400).json(error);
  }
};
module.exports.getUserOrderSolde = async (req, res) => {
  const { userId } = req.params;
  if (!ObjectId.isValid(userId))
    return res.status(400).json({ message: "Id invalide" });

  try {
    const soldeOrderUser = await SoldeOrderModel.find({ userId: userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(soldeOrderUser);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
module.exports.getOneOrderSolde = async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id))
    return res.status(400).json({ message: "Id invalide" });

  try {
    const soldeOrder = await SoldeOrderModel.findById(id);
    res.status(200).json(soldeOrder);
  } catch (error) {
    res.status(400).json(error);
  }
};
module.exports.getOrderSoldeByNum = async (req, res) => {
  const { numSolde } = req.params;

  try {
    const soldeOrderByNum = await SoldeOrderModel.findOne({
      numSolde: numSolde,
    });
    res.status(200).json(soldeOrderByNum);
  } catch (error) {
    res.status(400).json(error);
  }
};
module.exports.updateOrderSolde = async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id))
    return res.status(400).json({ message: "Id invalide" });

  try {
    const soldeOrderUpdated = await SoldeOrderModel.findByIdAndUpdate(
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

    res.status(200).json(soldeOrderUpdated);
  } catch (error) {
    res.status(400).json(error);
  }
};
module.exports.deleteOrderSolde = async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id))
    return res.status(400).json({ message: "Id invalide" });

  try {
    const soldeOrderDeleted = await SoldeOrderModel.findByIdAndDelete(id);
    res.status(200).json(soldeOrderDeleted);
  } catch (error) {
    res.status(400).json(error);
  }
};
