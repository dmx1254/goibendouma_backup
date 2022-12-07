const express = require("express");
const { checkAdmin } = require("../middleware/auth.admin.middleware");
const orderController = require("../controllers/order.controller");

const router = express.Router();

//Orders routes

router.post("/", orderController.createOrder);
router.get("/", orderController.getAllOrders);
router.get("/ordernum/:numorder", orderController.getOrderByNumOrder);
router.put("/:id", orderController.updateOrder);
router.get("/find/:userId", orderController.getUserOrder);
router.get("/income", orderController.getIncome);
router.delete("/:id", orderController.deleteOrder);
router.post("/rate", orderController.createRate);
router.get("/rate", orderController.getAllRates);
router.put("/rate/:id", orderController.updateRate);
router.get("/rate/:id", orderController.getSingleRate);
router.delete("/rate/:id", orderController.deleteRate);

module.exports = router;
