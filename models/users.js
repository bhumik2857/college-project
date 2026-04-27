const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true   // prevents duplicate emails
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "student", "faculty"],
        default: "student"
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
