const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  cgpa: { type: Number, default: 0 }   // ✅ SAFE ADDITION
});

module.exports = mongoose.model("User", userSchema);
