const ConnectModel = require("../models/connectModel");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports.postUserConnected = async (req, res) => {
  const { userId, lastname, firstname, dateToConnect, dateToDisconnect } =
    req.body;

  try {
    const connectedData = await ConnectModel.create({
      userId,
      lastname,
      firstname,
      dateToConnect,
      dateToDisconnect,
    });
    res.status(200).json(connectedData);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.getAllUserConnected = async (req, res) => {
  try {
    const userConnected = await ConnectModel.find();
    res.status(200).json(userConnected);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.deleteUserConnected = async (req, res) => {
  const { id } = req.params;
  try {
    const userDeleted = await ConnectModel.findByIdAndDelete(id);
    res.status(200).json(userDeleted);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.updateUserConnected = async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id))
    return res.status(400).json({ message: "ID inconnu " + id });

  try {
    const userConnectUpdated = await ConnectModel.findByIdAndUpdate(
      id,
      {
        $set: {
          dateToDisconnect: req.body.dateToDisconnect,
        },
      },
      {
        new: true,
      }
    );
    res.status(200).json(userConnectUpdated);
  } catch (error) {
    res.status(400).json(error);
  }
};
