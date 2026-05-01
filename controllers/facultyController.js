const Users = require("../models/user");
const Attendance = require("../models/attendance");
const Timetable = require("../models/timetable");

// ================= DASHBOARD =================
async function getFacultyDashboard(req, res) {
  try {
    // fetch fresh students every time
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
    return res.status(500).send("Error loading dashboard");
  }
}

// ================= UPDATE CGPA =================
async function updateCGPA(req, res) {
  try {
    let { studentId, cgpa } = req.body;

    // ✅ FIX: ensure number type
    cgpa = Number(cgpa);

    if (isNaN(cgpa)) {
      return res.send("Invalid CGPA value");
    }

    await Users.findByIdAndUpdate(studentId, {
      cgpa: cgpa
    });

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

    await Attendance.create({
      studentId,
      subject,
      attendedClasses: Number(attendedClasses),
      totalClasses: Number(totalClasses)
    });

    return res.redirect("/faculty/dashboard");

  } catch (err) {
    console.log("ATTENDANCE ERROR:", err);
    return res.status(500).send("Error updating attendance");
  }
}

// ================= ADD TIMETABLE =================
async function addTimetable(req, res) {
  try {
    const { day, subject, time } = req.body;

    await Timetable.create({
      day,
      subject,
      time
    });

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
