const express = require("express");
const router = express.Router();

const { restrictedToLoginOnly } = require("../middlewares/auth");
const facultyController = require("../controllers/facultyController");

// ================= DASHBOARD =================
router.get(
  "/dashboard",
  restrictedToLoginOnly,
  facultyController.getFacultyDashboard
);

// ================= UPDATE CGPA =================
router.post("/update-cgpa", async (req, res) => {
  const { studentId, cgpa } = req.body;

  const Student = require("../models/student");

  await Student.findByIdAndUpdate(studentId, { cgpa });

  res.redirect("/faculty/dashboard");
});

// ================= UPDATE ATTENDANCE =================
router.post("/update-attendance", async (req, res) => {
  const { studentId, subject, attendedClasses, totalClasses } = req.body;

  const Attendance = require("../models/attendance");

  await Attendance.findOneAndUpdate(
    { studentId, subject },
    { attendedClasses, totalClasses },
    { upsert: true }
  );

  res.redirect("/faculty/dashboard");
});

// ================= ADD TIMETABLE =================
router.post("/add-timetable", async (req, res) => {
  const Timetable = require("../models/timetable");

  await Timetable.create(req.body);

  res.redirect("/faculty/dashboard");
});

module.exports = router;