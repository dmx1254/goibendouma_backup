const router = require("express").Router();
const soldeController = require("../controllers/solde.controller");

router.post("/", soldeController.createSolde);

router.get("/", soldeController.getAllSoldes);

router.delete("/:id", soldeController.deleteSolde);

router.put("/:id", soldeController.updateSolde);

module.exports = router;
