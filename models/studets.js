const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    college: {
        type: String,
        required: true
    },
    universityRollNo: {
        type: Number,
        required: true
    },
    course: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Students = mongoose.model("Students", studentSchema);

module.exports = Students;