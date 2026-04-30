const express = require("express");
const router = express.Router();
router.get("/logout", (req, res) => {
    res.clearCookie("token"); // or whatever cookie you used
    return res.redirect("/user/login");
});

const {
  handleLogin,
  handleRegister,
  handleLogout
} = require("../controllers/userController");

// REGISTER
router.post("/register", handleRegister);

// LOGIN
router.post("/login", handleLogin);

// LOGOUT
router.get("/logout", handleLogout);

module.exports = router;