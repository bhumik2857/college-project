const express = require("express");
const router = express.Router();

const {
  handleLogin,
  handleRegister,
  handleLogout
} = require("../controllers/userController");

// REGISTER
router.post("/register", handleRegister);

// LOGIN
router.post("/login", handleLogin);

// LOGIN PAGE (IMPORTANT for GET /user/login error)
router.get("/login", (req, res) => {
  res.render("login");
});

// LOGOUT
router.get("/logout", handleLogout);

module.exports = router;
