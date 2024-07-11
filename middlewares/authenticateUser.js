const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateAccessToken = (req,res,next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token) {
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        res.sendStatus(403);
    }
    return;
  }
  return res.sendStatus(401);
};

module.exports = authenticateAccessToken;
