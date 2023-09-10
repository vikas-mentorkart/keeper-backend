const jwt = require("jsonwebtoken");
const isLoggedIn = (req, res, next) => {
  const token = req.headers["authorization"];
  try {
    req.user = jwt.verify(token, "123456");
    next();
  } catch (err) {
    return res.json({
      success: false,
      message: "Token has expired, Please login again",
    });
  }
};

module.exports = isLoggedIn;
