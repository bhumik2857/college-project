const Students = require("../models/students");
const Attendance = require("../models/attendance");

async function getFacultyDashboard(req, res) {
  const students = await Students.find({});
  const attendance = await Attendance.find({});

  res.render("facultyDashboard", { students, attendance });
}

async function updateAttendance(req, res) {
  const { present, total } = req.body;

  await Attendance.findOneAndUpdate(
    { studentId: req.params.id },
    { present, total },
    { upsert: true }
  );

  res.redirect("/faculty");
}

async function updateStudent(req, res) {
  const { timetable, cgpa } = req.body;

  await Students.findByIdAndUpdate(req.params.id, {
    timetable,
    cgpa
  });

  res.redirect("/faculty");
}

module.exports = {
  getFacultyDashboard,
  updateAttendance,
  updateStudent
};