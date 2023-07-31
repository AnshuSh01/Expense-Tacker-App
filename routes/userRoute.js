const express = require("express");
const {
  loginController,
  registerController,
  forgotPasswordController,
  resetPasswordController,
} = require("../controllers/userController");
const router = express.Router();

router.post("/login", loginController);

router.post("/register", registerController);
router.post("/forgot-password", forgotPasswordController);
router.post("/resetpassword/:token", resetPasswordController);

module.exports = router;
