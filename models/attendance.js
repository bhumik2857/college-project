const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Students"
  },
  present: Number,
  total: Number
});

module.exports = mongoose.model("Attendance", attendanceSchema);