const Users = require("../models/user");
const Attendance = require("../models/attendance");
const Timetable = require("../models/timetable");

// ================= DASHBOARD =================
async function getFacultyDashboard(req, res) {
  try {
    // 🔥 get only students from users collection
    const students = await Users.find({ role: "student" });

    const attendance = await Attendance.find();
    const timetable = await Timetable.find();

    res.render("facultyDashboard", {
      students,
      attendance,
      timetable
    });

  } catch (err) {
    console.log("FACULTY DASHBOARD ERROR:", err);
    res.send("Error loading dashboard");
  }
}

// ================= UPDATE CGPA =================
async function updateCGPA(req, res) {
  try {
    const { studentId, cgpa } = req.body;

    await Users.findByIdAndUpdate(studentId, { cgpa });

    res.redirect("/faculty/dashboard");

  } catch (err) {
    console.log("CGPA ERROR:", err);
    res.send("Error updating CGPA");
  }
}

// ================= UPDATE ATTENDANCE =================
async function updateAttendance(req, res) {
  try {
    const { studentId, subject, attendedClasses, totalClasses } = req.body;

    await Attendance.create({
      studentId,
      subject,
      attendedClasses,
      totalClasses
    });

    res.redirect("/faculty/dashboard");

  } catch (err) {
    console.log("ATTENDANCE ERROR:", err);
    res.send("Error updating attendance");
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

    res.redirect("/faculty/dashboard");

  } catch (err) {
    console.log("TIMETABLE ERROR:", err);
    res.send("Error adding timetable");
  }
}

module.exports = {
  getFacultyDashboard,
  updateCGPA,
  updateAttendance,
  addTimetable
};