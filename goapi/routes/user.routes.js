const router = require("express").Router();

const userController = require("../controllers/users.controller");
const authController = require("../controllers/auth.controller");
const { checkAdmin } = require("../middleware/auth.admin.middleware");

//Users routes
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);
router.post("/forgot-password", authController.forgotPassword);
// router.get("/reset-password/:id/:tokenId", authController.resetPassword);
router.post("/reset/password", authController.createNewPassword);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getOneUser);
router.get("/stats", userController.getStats);
router.get("/:mail", userController.getMail);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.get("/admin/:email", userController.deleteUserByAdmin);

module.exports = router;
