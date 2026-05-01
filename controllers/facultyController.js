const Users = require("../models/user");
const Attendance = require("../models/attendance");
const Timetable = require("../models/timetable");

// ================= DASHBOARD =================
async function getFacultyDashboard(req, res) {
  try {
    const students = await Users.find({ role: "student" });
    const attendance = await Attendance.find();
    const timetable = await Timetable.find();

    return res.render("facultyDashboard", {
      students,
      attendance,
      timetable
    });
  } catch (err) {
    console.log("FACULTY DASHBOARD ERROR:", err);
    return res.status(500).send("Dashboard error");
  }
}

// ================= UPDATE CGPA =================
async function updateCGPA(req, res) {
  try {
    let { studentId, cgpa } = req.body;

    cgpa = Number(cgpa);

    if (!studentId || isNaN(cgpa)) {
      return res.send("Invalid data");
    }

    const updated = await Users.findByIdAndUpdate(
      studentId,
      { cgpa },
      { new: true }
    );

    console.log("CGPA UPDATED:", updated);

    return res.redirect("/faculty/dashboard");
  } catch (err) {
    console.log("CGPA ERROR:", err);
    return res.status(500).send("Error updating CGPA");
  }
}

// ================= UPDATE ATTENDANCE =================
async function updateAttendance(req, res) {
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
}

// ================= ADD TIMETABLE =================
async function addTimetable(req, res) {
  try {
    await Timetable.create(req.body);
    return res.redirect("/faculty/dashboard");
  } catch (err) {
    console.log("TIMETABLE ERROR:", err);
    return res.status(500).send("Error adding timetable");
  }
}

module.exports = {
  getFacultyDashboard,
  updateCGPA,
  updateAttendance,
  addTimetable
};
