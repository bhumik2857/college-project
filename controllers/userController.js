const Users = require("../models/user");
const bcrypt = require("bcrypt");
const { setUser } = require("../service/auth");

// ================= REGISTER =================
async function handleRegister(req, res) {
  try {
    let { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.render("register", {
        error: "All fields required ❌"
      });
    }

    email = email.trim().toLowerCase();

    const existing = await Users.findOne({ email });
    if (existing) {
      return res.render("register", {
        error: "User already exists ❌"
      });
    }

    const hash = await bcrypt.hash(password, 10);

    await Users.create({
      name,
      email,
      password: hash,
      role,
      cgpa: 0   // 👈 store cgpa directly here
    });

    return res.redirect("/login");

  } catch (err) {
    console.log("REGISTER ERROR:", err);
    return res.render("register", { error: err.message });
  }
}

// ================= LOGIN =================
async function handleLogin(req, res) {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.render("login", {
        error: "Email & password required ❌"
      });
    }

    email = email.trim().toLowerCase();

    const user = await Users.findOne({ email });
    if (!user) {
      return res.render("login", {
        error: "User not found ❌"
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.render("login", {
        error: "Wrong password ❌"
      });
    }

    const token = setUser(user);

    res.cookie("uid", token, { httpOnly: true });

    if (user.role === "student") return res.redirect("/student/dashboard");
    if (user.role === "faculty") return res.redirect("/faculty/dashboard");

    return res.redirect("/login");

  } catch (err) {
    console.log("LOGIN ERROR:", err);
    return res.render("login", { error: "Login failed ❌" });
  }
}

// ================= LOGOUT =================
function handleLogout(req, res) {
  res.clearCookie("uid");
  return res.redirect("/login");
}

module.exports = {
  handleRegister,
  handleLogin,
  handleLogout
};