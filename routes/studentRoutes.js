const express = require("express");
const router = express.Router();

const { restrictedToLoginOnly } = require("../middlewares/auth");
const studentController = require("../controllers/studentController");

router.get("/dashboard", restrictedToLoginOnly, studentController.getStudentDashboard);

module.exports = router;