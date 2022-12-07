const router = require("express").Router();

const soldeOrderController = require("../controllers/solde.order.controller.js.js");

router.post("/", soldeOrderController.createOrderSolde);
router.get("/", soldeOrderController.getAllOrdersSolde);
router.get("/user/:userId", soldeOrderController.getUserOrderSolde);
router.get("/:id", soldeOrderController.getOneOrderSolde);
router.get("/num/:numSolde", soldeOrderController.getOrderSoldeByNum);
router.put("/:id", soldeOrderController.updateOrderSolde);
router.delete("/:id", soldeOrderController.deleteOrderSolde);

module.exports = router;


