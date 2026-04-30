require("dotenv").config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");

const app = express();

// ================= DB CONNECTION =================
connectDB();

// ================= MIDDLEWARE =================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ================= STATIC FILES (CSS, JS, IMAGES) =================
// IMPORTANT: THIS MAKES /style.css WORK
app.use(express.static(path.join(__dirname, "public")));

// ================= VIEW ENGINE =================
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ================= ROUTES =================
app.use("/", require("./routes/staticRoutes"));
app.use("/user", require("./routes/userRoutes"));
app.use("/student", require("./routes/studentRoutes"));
app.use("/faculty", require("./routes/facultyRoutes"));

// ================= SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});