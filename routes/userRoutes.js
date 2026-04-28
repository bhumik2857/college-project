const express = require("express");
const router = express.Router();

const {
  handleLogin,
  handleRegister,
  handleLogout
} = require("../controllers/userController");

const Users = require("../models/users");

// existing routes
router.post("/login", handleLogin);
router.post("/register", handleRegister);
router.post("/logout", handleLogout);

// ✅ FORGOT PASSWORD PAGE
router.get("/forgot", (req, res) => {
  res.render("forgot");
});

// ✅ RESET PASSWORD LOGIC (WRITE HERE 👇)
router.post("/forgot", async (req, res) => {
  const { email, newPassword } = req.body;

  const user = await Users.findOne({ email });

  if (!user) {
    return res.render("forgot", { error: "Email not found ❌" });
  }

  const bcrypt = require("bcrypt");
  const hashed = await bcrypt.hash(newPassword, 10);

  user.password = hashed;
  await user.save();

  res.redirect("/login");
});

module.exports = router;