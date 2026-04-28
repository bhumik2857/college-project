const Users = require("../models/users");
const bcrypt = require("bcrypt");
const { setUser } = require("../service/auth");


// 🔐 REGISTER
async function handleRegister(req, res) {
    try {
        const { name, email, password, role } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        await Users.create({
            name,
            email,
            password: hashedPassword,
            role   // ✅ VERY IMPORTANT
        });

        return res.redirect("/login");

    } catch (err) {
        return res.render("register", {
            error: "User already exists or something went wrong ❌"
        });
    }
}


// 🔐 LOGIN
async function handleLogin(req, res) {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });

    if (!user) {
        return res.render("login", { error: "User not registered ❌" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.render("login", { error: "Wrong password ❌" });
    }

    const token = setUser(user);

    res.cookie("uid", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true
    });

    // ✅ ROLE BASED REDIRECT
    if (user.role === "student") {
        return res.redirect("/student");
    }

    if (user.role === "faculty") {
        return res.redirect("/faculty");
    }

    if (user.role === "admin") {
        return res.redirect("/admin");
    }

    return res.redirect("/login");
}


// 🔓 LOGOUT
async function handleLogout(req, res) {
    res.clearCookie("uid");
    return res.redirect("/login");
}


module.exports = {
    handleLogin,
    handleRegister,
    handleLogout
};