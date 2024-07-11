const jwt = require("jsonwebtoken");
require("dotenv").config()

const generateRefreshToken = (user) => {
    let token = jwt.sign(
        {
            id : user.id,
            email : user.email,
            username : user.username
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : "15m",
        }
    );
    return token;
};

module.exports = generateRefreshToken;