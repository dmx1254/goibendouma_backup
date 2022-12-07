const router = require("express").Router();
const exchangeController = require("../controllers/exchange.controller");

router.post("/", exchangeController.addExchange);
router.get("/", exchangeController.getAllExchanges);
router.get("/user/:userId", exchangeController.getUserExchange);
router.get("/:id", exchangeController.getExchangeById);
router.get("/num/:numExchange", exchangeController.getExchangeByNum);
router.put("/:id", exchangeController.updateExchange);
router.delete("/:id", exchangeController.deleteExchange);

module.exports = router;
