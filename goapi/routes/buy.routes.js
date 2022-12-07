const router = require("express").Router();

const buyController = require("../controllers/buy.controller");

router.post("/", buyController.createBuy);
router.get("/", buyController.getAllBuy);
router.get("/:id", buyController.getOneBuy);
router.put("/:id", buyController.updateBuy);
router.get("/user/:id", buyController.findBuyUsers);
router.delete("/:id", buyController.deleteBuy);
module.exports = router;
