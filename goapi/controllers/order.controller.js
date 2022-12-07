const OrderModel = require("../models/order.model");
const RateModel = require("../models/rate.model");
const ObjectId = require("mongoose").Types.ObjectId;

//Create order
module.exports.createOrder = async (req, res) => {
  const {
    userId,
    orderNum,
    products,
    address,
    status,
    totalPrice,
    paymentDate,
  } = req.body;

  try {
    const savedOrder = await OrderModel.create({
      userId,
      orderNum,
      products,
      address,
      status,
      totalPrice,
      paymentDate,
    });
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
};

//GET ALL ORDERS
module.exports.getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.getOrderByNumOrder = async (req, res) => {
  const { numorder } = req.params;

  try {
    const getOrder = await OrderModel.findOne({ orderNum: numorder });
    res.status(200).json(getOrder);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

//Update status order
module.exports.updateOrder = async (req, res) => {
  if (ObjectId.isValid(req.params.numorder))
    return res.status(400).json({ message: "ID unknown" });
  try {
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          status: req.body.status,
          paymentDate: req.body.paymentDate,
        },
      },
      { new: true, upsert: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Delete order
module.exports.deleteOrder = async (req, res) => {
  if (ObjectId.isValid(req.params.numorder))
    return res.status(400).json({ message: "ID unknown" });
  try {
    await OrderModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};

//Get users order
module.exports.getUserOrder = async (req, res) => {
  try {
    const orders = await OrderModel.find({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Get income for all product selling
module.exports.getIncome = async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$totalPrice",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.createRate = async (req, res) => {
  const { rate } = req.body;
  try {
    const rateNumber = await RateModel.create({ rate });
    res.status(200).json(rateNumber);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.getAllRates = async (req, res) => {
  try {
    const rates = await RateModel.find();
    res.status(200).json(rates);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.updateRate = async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id))
    return res.status(400).json({ message: "ID unknown" });

  try {
    const rateUpdated = await RateModel.findByIdAndUpdate(
      id,
      {
        $set: {
          rate: req.body.rate,
        },
      },
      {
        new: true,
        upsert: true,
      }
    );

    res.status(200).json(rateUpdated);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.deleteRate = async (req, res) => {
  const { id } = req.params;
  try {
    const rateDeleted = await RateModel.findByIdAndDelete(id);
    res.status(200).json(rateDeleted);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports.getSingleRate = async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id))
    return res.status(400).json({ message: "ID unknown" });

  try {
    const rateFind = await RateModel.findById(id);
    res.status(200).json(rateFind);
  } catch (error) {
    res.status(400).json(error);
  }
};
