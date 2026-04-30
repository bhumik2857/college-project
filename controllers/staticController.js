const Students = require("../models/student");

// ================= HOME =================
async function getHome(req, res) {
    try {
        const students = await Students.find({});
        return res.render("Home", { students });
    } catch (err) {
        console.log("Home Error:", err);
        return res.status(500).send("Error loading home page");
    }
}

// ================= EDIT PAGE =================
async function getEdit(req, res) {
    try {
        const id = req.params.id;

        const student = await Students.findById(id);

        if (!student) {
            return res.status(404).send("Student not found");
        }

        return res.render("edit", { student });

    } catch (err) {
        console.log("Edit Page Error:", err);
        return res.status(500).send("Error loading edit page");
    }
}

// ================= ADD PAGE =================
async function getAdd(req, res) {
    try {
        return res.render("add");
    } catch (err) {
        console.log("Add Page Error:", err);
        return res.status(500).send("Error loading add page");
    }
}

// ================= LOGIN =================
async function getLogin(req, res) {
    try {
        return res.render("login");
    } catch (err) {
        console.log("Login Page Error:", err);
        return res.status(500).send("Error loading login page");
    }
}

// ================= REGISTER =================
async function getRegister(req, res) {
    try {
        return res.render("register");
    } catch (err) {
        console.log("Register Page Error:", err);
        return res.status(500).send("Error loading register page");
    }
}

module.exports = {
    getHome,
    getAdd,
    getEdit,
    getLogin,
    getRegister
};