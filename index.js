require("dotenv").config();
const express = require("express");
const app = express();
const connection = require("./conectionMongodb");
const staticRoutes = require("./routes/staticRoutes");
const studentRoutes = require("./routes/studentRoutes");
const userRoutes = require("./routes/userRoutes");
const path = require("path");
const cookieParser = require("cookie-parser");
const { restrictedToLoginOnly } = require("./middlewares/auth");
const methodOverride = require("method-override");

const port = process.env.port || 5000;
const mongoUrl = process.env.MONGODB_URI;

// 🔌 Database Connection
connection(mongoUrl);

// 🔧 Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ✅ fixed spelling
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(methodOverride('_method'));

// 🎨 View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 🚀 Routes
app.use("/", staticRoutes);
app.use("/student", restrictedToLoginOnly, studentRoutes);
app.use("/user", userRoutes);

// 🎯 Dashboards (Role-based)
app.get("/admin", restrictedToLoginOnly, (req, res) => {
  if (req.user.role !== "admin") return res.send("Access Denied");
  res.send("Admin Dashboard");
});

app.get("/faculty", restrictedToLoginOnly, (req, res) => {
  if (req.user.role !== "faculty") return res.send("Access Denied");
  res.send("Faculty Dashboard");
});

app.get("/student", restrictedToLoginOnly, (req, res) => {
  if (req.user.role !== "student") return res.send("Access Denied");
  res.send("Student Dashboard");
});

// 🏁 Start Server
app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
