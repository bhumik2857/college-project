const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  college: String,
  universityRollNo: Number,
  course: String,

  cgpa: {
    type: Number,
    default: () => Number((Math.random() * 4 + 6).toFixed(2))
  },

  timetable: {
    type: [
      {
        day: String,
        subject: String,
        time: String
      }
    ],
    default: () => [
      { day: "Monday", subject: "DSA", time: "10-11" },
      { day: "Tuesday", subject: "CN", time: "11-12" },
      { day: "Wednesday", subject: "DBMS", time: "12-1" },
      { day: "Thursday", subject: "OS", time: "10-11" },
      { day: "Friday", subject: "AI", time: "2-3" }
    ]
  }
});

module.exports =
  mongoose.models.Students ||
  mongoose.model("Students", studentSchema);