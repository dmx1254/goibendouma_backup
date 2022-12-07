const express = require("express");

const router = express.Router();

//Codes routes

const connectController = require("../controllers/connect.controller");

router.post("/", connectController.postUserConnected);
router.get("/", connectController.getAllUserConnected);
router.delete("/:id", connectController.deleteUserConnected);
router.put("/:id", connectController.updateUserConnected);

module.exports = router;
