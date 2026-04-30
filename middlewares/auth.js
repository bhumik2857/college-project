const jwt = require("jsonwebtoken");

function restrictedToLoginOnly(req, res, next) {
  const token = req.cookies.uid;

  if (!token) return res.redirect("/login");

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = user;
    next();
  } catch {
    return res.redirect("/login");
  }
}

module.exports = { restrictedToLoginOnly };