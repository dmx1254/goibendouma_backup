const SoldeModel = require("../models/solde.model");

const ObjectId = require("mongoose").Types.ObjectId;

module.exports.createSolde = async (req, res) => {
  const { solde, priceDh, status } = req.body;

  try {
    const soldeCreated = await SoldeModel.create({
      solde,
      priceDh,
      status,
    });

    res.status(200).json(soldeCreated);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.getAllSoldes = async (req, res) => {
  try {
    const allSoldes = await SoldeModel.find();
    res.status(200).json(allSoldes);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.updateSolde = async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id))
    return res.status(400).json({ message: "Id invalide" });

  try {
    // const soldeFinder = await SoldeModel.findById(id);

    // const sold = soldeFinder.solde;
    // const pricDh = soldeFinder.priceDh;
    // const stat = soldeFinder.status;

    const soldeUpdated = await SoldeModel.findByIdAndUpdate(
      id,
      {
        $set: {
          // solde: req.body.solde ? req.body.solde : sold,
          priceDh: req.body.priceDh,
          status: req.body.status,
        },
      },
      {
        new: true,
        upsert: true,
      }
    );

    res.status(200).json(soldeUpdated);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.deleteSolde = async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id))
    return res.status(400).json({ message: "Id invalide" });

  try {
    const soldeDeleted = await SoldeModel.findByIdAndDelete(id);
    res.status(200).json(soldeDeleted);
  } catch (error) {
    res.status(400).json(error);
  }
};
