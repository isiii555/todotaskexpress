const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyRefreshToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    return { success: true, data: decoded };
  } catch (err) {
    return { success: false, error : err.message };
  }
};

module.exports = verifyRefreshToken;
