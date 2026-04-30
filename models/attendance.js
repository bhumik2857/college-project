const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // ✅ FIXED
  subject: String,
  totalClasses: Number,
  attendedClasses: Number
});

module.exports = mongoose.model("Attendance", attendanceSchema);