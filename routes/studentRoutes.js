const express = require("express");
const router = express.Router();

const { getStudentDashboard } = require("../controllers/studentController");

router.get("/", getStudentDashboard);

module.exports = router;