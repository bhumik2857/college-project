const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  course: String,
  cgpa: { type: Number, default: 0 }
});

module.exports = mongoose.model("Student", studentSchema);