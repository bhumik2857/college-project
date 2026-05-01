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

    const updated = await Users.findByIdAndUpdate(
      studentId,
      { cgpa: Number(cgpa) },
      { new: true }   // ✅ important: ensures update happens correctly
    );

    console.log("CGPA UPDATED:", updated);

    return res.redirect("/faculty/dashboard");
  } catch (err) {
    console.log("CGPA ERROR:", err);
    return res.status(500).send("Error updating CGPA");
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

    return res.redirect("/faculty/dashboard");
  } catch (err) {
    console.log("ATTENDANCE ERROR:", err);
    return res.status(500).send("Error updating attendance");
  }
});

// ================= ADD TIMETABLE =================
router.post("/add-timetable", async (req, res) => {
  try {
    await Timetable.create(req.body);
    return res.redirect("/faculty/dashboard");
  } catch (err) {
    console.log("TIMETABLE ERROR:", err);
    return res.status(500).send("Error adding timetable");
  }
});

module.exports = router;
