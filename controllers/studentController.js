const Users = require("../models/user");
const Attendance = require("../models/attendance");
const Timetable = require("../models/timetable");

async function getStudentDashboard(req, res) {
  try {
    const user = await Users.findById(req.user.id);

    if (!user) {
      return res.send("User not found ❌");
    }

    const attendance = await Attendance.find({
      studentId: user._id
    });

    const timetable = await Timetable.find();

    res.render("studentDashboard", {
      student: user,   // 🔥 use user directly
      attendance,
      timetable
    });

  } catch (err) {
    console.log("STUDENT ERROR:", err);
    res.send("Error loading dashboard");
  }
}

module.exports = { getStudentDashboard };