const ExchangeModel = require("../models/exchange.model");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports.addExchange = async (req, res) => {
  const {
    userId,
    numExchange,
    serverOut,
    qtyToPay,
    characterToPay,
    serverIn,
    qtyToReceive,
    characterToReceive,
    codeToExchange,
    status,
    nameExchanger,
    emailExchanger,
    profilExchanger,
  } = req.body;

  try {
    const userExchange = await ExchangeModel.create({
      userId,
      numExchange,
      serverOut,
      qtyToPay,
      characterToPay,
      serverIn,
      qtyToReceive,
      characterToReceive,
      codeToExchange,
      status,
      nameExchanger,
      emailExchanger,
      profilExchanger,
    });

    res.status(200).json(userExchange);
  } catch (error) {}
};

module.exports.getAllExchanges = async (req, res) => {
  try {
    const allExchanges = await ExchangeModel.find().sort({ createdAt: -1 });
    res.status(200).json(allExchanges);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports.getUserExchange = async (req, res) => {
  const { userId } = req.params;
  if (!ObjectId.isValid(userId))
    return res.status(400).json({ message: "Id invalide" });

  try {
    const exchangesUser = await ExchangeModel.find({ userId: userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(exchangesUser);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports.getExchangeById = async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id))
    return res.status(400).json({ message: "Id invalide" });

  try {
    const exchange = await ExchangeModel.findById(id);
    res.status(200).json(exchange);
  } catch (error) {
    res.status(400).json(error);
  }
};
module.exports.getExchangeByNum = async (req, res) => {
  const { numExchange } = req.params;

  try {
    const exchangeByNum = await ExchangeModel.findOne({
      numExchange: numExchange,
    });
    res.status(200).json(exchangeByNum);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.updateExchange = async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id))
    return res.status(400).json({ message: "Id invalide" });

  try {
    const exchangeFind = await ExchangeModel.findById(id);
    const stat = exchangeFind.status;
    const servOut = exchangeFind.serverOut;
    const servIn = exchangeFind.serverIn;
    const qtypa = exchangeFind.qtyToPay;
    const charToPay = exchangeFind.characterToPay;
    const charToReceive = exchangeFind.characterToReceive;
    const exchangeUpdated = await ExchangeModel.findByIdAndUpdate(
      id,
      {
        $set: {
          status: req.body.status ? req.body.status : stat,
          serverOut: req.body.serverOut ? req.body.serverOut : servOut,
          serverIn: req.body.serverIn ? req.body.serverIn : servIn,
          qtyToPay: req.body.qtyToPay ? req.body.qtyToPay : qtypa,
          characterToPay: req.body.characterToPay
            ? req.body.characterToPay
            : charToPay,
          characterToReceive: req.body.characterToReceive
            ? req.body.characterToReceive
            : charToReceive,
        },
      },
      {
        new: true,
        upsert: true,
      }
    );
    res.status(200).json(exchangeUpdated);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.deleteExchange = async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id))
    return res.status(400).json({ message: "Id invalide" });

  try {
    const exchangeDeleted = await ExchangeModel.findByIdAndDelete(id);
    res.status(200).json(exchangeDeleted);
  } catch (error) {
    res.status(400).json(error);
  }
};
