const Users = require("../models/users");
const bcrypt = require("bcrypt");
const { setUser } = require("../service/auth");
async function handleRegister(req, res) {
    try {
        const { name, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await Users.create({
            name: name,
            email: email,
            password: hashedPassword,
        });
        return res.redirect("/login");

    }
    catch (err) {
        return res.status(500).render("register", { error: "something went wring ! user is not register" });
    }


};

async function handleLogin(req, res) {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user) return res.status(404).render("login", { error: "user does not exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).render("login", { error: "inccorect password" });

    const token = setUser(user);
    res.cookie("uid", token,
        {
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
            httpOnly:true // js can't read the cookie
        }
    );
    return res.redirect("/");
};
async function handleLogout(req, res) {
    res.clearCookie("uid");
    return res.render("login");
}

module.exports = {
    handleLogin,
    handleRegister,
    handleLogout
};