const RateCnyModel = require("../models/rateCny.model");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports.createCny = async (req, res) => {
  const { cny } = req.body;

  try {
    const cnyCreated = await RateCnyModel.create({ cny });
    res.status(200).json(cnyCreated);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports.updateCny = async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id))
    return res.status(400).json({ message: "ID inconu" });

  try {
    const updatedcny = await RateCnyModel.findByIdAndUpdate(
      id,
      {
        $set: {
          cny: req.body.cny,
        },
      },
      {
        new: true,
        upsert: true,
      }
    );
    res.status(200).json(updatedcny);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports.getAllCny = async (req, res) => {
  try {
    const allCnys = await RateCnyModel.find();
    res.status(200).json(allCnys);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
module.exports.getSingleCny = async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id))
    return res.status(400).json({ message: "ID inconnu" });

  try {
    const getOneCny = await RateCnyModel.findById(id);
    res.status(200).json(getOneCny);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports.deleteCny = async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id))
    return res.status(400).json({ message: "ID inconnu" });

  try {
    const deletedCny = await RateCnyModel.findByIdAndDelete(id);
    res.status(200).json(deletedCny);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
