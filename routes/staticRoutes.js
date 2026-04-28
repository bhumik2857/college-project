const {
  getHome,
  getEdit,
  getAdd,
  getLogin,
  getRegister
} = require("../controllers/staticController");

const express = require("express");
const router = express.Router();

const { restrictedToLoginOnly } = require("../middlewares/auth");

// ❌ REMOVE restriction from home
router.get("/", (req, res) => {
  res.redirect("/login");
});

// protected routes
router.get("/add", restrictedToLoginOnly, getAdd);
router.get("/edit/:id", restrictedToLoginOnly, getEdit);

// public routes
router.get("/login", getLogin);
router.get("/register", getRegister);

module.exports = router;