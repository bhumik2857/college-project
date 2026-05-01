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
router.post("/update-cgpa", async (req, res) => {
  try {
    const { studentId, cgpa } = req.body;

    await Users.findByIdAndUpdate(studentId, {
      cgpa: Number(cgpa)
    });

    res.redirect("/faculty/dashboard");
  } catch (err) {
    console.log("CGPA ERROR:", err);
    res.send("Error updating CGPA");
  }
});

// ================= UPDATE ATTENDANCE =================
router.post("/update-attendance", async (req, res) => {
  try {
    const { studentId, subject, attendedClasses, totalClasses } = req.body;

    await Attendance.findOneAndUpdate(
      { studentId, subject },
      {
        attendedClasses: Number(attendedClasses),
        totalClasses: Number(totalClasses)
      },
      { upsert: true }
    );

    res.redirect("/faculty/dashboard");
  } catch (err) {
    console.log("ATTENDANCE ERROR:", err);
    res.send("Error updating attendance");
  }
});

// ================= ADD TIMETABLE =================
router.post("/add-timetable", async (req, res) => {
  try {
    await Timetable.create(req.body);
    res.redirect("/faculty/dashboard");
  } catch (err) {
    console.log("TIMETABLE ERROR:", err);
    res.send("Error adding timetable");
  }
});

module.exports = router;
