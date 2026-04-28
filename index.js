require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");

const connection = require("./conectionMongodb");

const staticRoutes = require("./routes/staticRoutes");
const studentRoutes = require("./routes/studentRoutes");
const userRoutes = require("./routes/userRoutes");
const facultyRoutes = require("./routes/facultyRoutes");

const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const { restrictedToLoginOnly } = require("./middlewares/auth");

const port = process.env.port || 5000;
const mongoUrl = process.env.MONGODB_URI;

// ================= DATABASE =================
connection(mongoUrl);

// ================= MIDDLEWARE =================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(methodOverride("_method"));

// ================= VIEW ENGINE =================
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ================= ROUTES =================
app.use("/", staticRoutes);
app.use("/user", userRoutes);

// 🔒 Protected routes
app.use("/student", restrictedToLoginOnly, studentRoutes);
app.use("/faculty", restrictedToLoginOnly, facultyRoutes);

// ================= ADMIN =================
app.get("/admin", restrictedToLoginOnly, (req, res) => {
  if (req.user.role !== "admin") return res.send("Access Denied");
  res.send("Admin Dashboard");
});

// ================= SERVER =================
app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
app.get("/logout", (req, res) => {
  res.clearCookie("uid"); // or whatever your cookie name is
  res.redirect("/login");
});