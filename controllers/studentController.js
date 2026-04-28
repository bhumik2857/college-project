const Students = require("../models/students");
const Attendance = require("../models/attendance");

async function getStudentDashboard(req, res) {
  try {
    const student = await Students.findOne({ email: req.user.email });

    let attendance = await Attendance.findOne({ studentId: student._id });

    // 🔥 AUTO CREATE DATA IF NOT EXISTS
    if (!attendance) {
      attendance = await Attendance.create({
        studentId: student._id,
        present: Math.floor(Math.random() * 20 + 10),
        total: 30
      });
    }

    let percentage = ((attendance.present / attendance.total) * 100).toFixed(2);

    res.render("studentDashboard", {
      student,
      attendance,
      percentage
    });

  } catch (err) {
    console.log(err);
    res.send("Error loading dashboard");
  }
}

module.exports = { getStudentDashboard };