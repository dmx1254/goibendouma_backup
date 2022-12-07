const router = require("express").Router();
const cnyController = require("../controllers/cny.controller");

router.post("/", cnyController.createCny);
router.get("/", cnyController.getAllCny);
router.get("/:id", cnyController.getSingleCny);
router.put("/:id", cnyController.updateCny);
router.delete("/:id", cnyController.deleteCny);

module.exports = router;
