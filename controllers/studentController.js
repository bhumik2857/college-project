const Users = require("../models/user");
const Attendance = require("../models/attendance");
const Timetable = require("../models/timetable");

async function getStudentDashboard(req, res) {
  try {
    if (!req.user || !req.user.id) {
      return res.send("Unauthorized access ❌");
    }

    // 🔥 IMPORTANT FIX: always fetch fresh data from DB
    const user = await Users.findById(req.user.id).select("-password");

    if (!user) {
      return res.send("User not found ❌");
    }

    // attendance only for this student
    const attendance = await Attendance.find({
      studentId: user._id
    });

    // timetable is common for all
    const timetable = await Timetable.find();

    return res.render("studentDashboard", {
      student: user,   // ✅ always latest DB value (CGPA included)
      attendance,
      timetable
    });

  } catch (err) {
    console.log("STUDENT ERROR:", err);
    return res.status(500).send("Error loading dashboard");
  }
}

module.exports = { getStudentDashboard };
