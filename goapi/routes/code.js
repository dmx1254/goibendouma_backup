const express = require("express");

const router = express.Router();

//Codes routes

const codeController = require("../controllers/code.controller");

router.post("/", codeController.postCode);
router.get("/", codeController.getAllCodes);

module.exports = router;
