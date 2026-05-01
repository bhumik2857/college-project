const express = require("express");
const router = express.Router();

const { restrictedToLoginOnly } = require("../middlewares/auth");
const facultyController = require("../controllers/facultyController");

const Users = require("../models/user");
const Attendance = require("../models/attendance");
const Timetable = require("../models/timetable");

// ================= DASHBOARD =================
router.get(
  "/dashboard",
  restrictedToLoginOnly,
  facultyController.getFacultyDashboard
);

// ================= UPDATE CGPA =================
router.post("/update-cgpa", facultyController.updateCGPA);

// ================= UPDATE ATTENDANCE =================
router.post("/update-attendance", facultyController.updateAttendance);

// ================= ADD TIMETABLE =================
router.post("/add-timetable", facultyController.addTimetable);

module.exports = router;
