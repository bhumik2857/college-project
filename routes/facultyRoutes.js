const express = require("express");
const router = express.Router();

const {
  getFacultyDashboard,
  updateAttendance,
  updateStudent
} = require("../controllers/facultyController");

// dashboard
router.get("/", getFacultyDashboard);

// update attendance
router.post("/attendance/:id", updateAttendance);

// update timetable + cgpa
router.post("/update/:id", updateStudent);

module.exports = router;
console.log(updateAttendance, updateStudent);