const express = require("express");
const router = express.Router();
const { authenticateAgent } = require("../middleware/agentAuthMiddleware");
const {
  register,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
} = require("../controllers/AgentAuthController");

router.post("/register", register);
router.post("/verify-email", verifyEmail);
router.post("/login", login);
router.delete("/logout", authenticateAgent, logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
