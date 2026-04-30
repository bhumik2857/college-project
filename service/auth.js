const jwt = require("jsonwebtoken");

function setUser(user) {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY
  );
}

module.exports = { setUser };