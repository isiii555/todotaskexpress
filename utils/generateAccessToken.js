const jwt = require("jsonwebtoken");
require("dotenv").config()

const generateAccessToken = (user) => {
    try {
        let token = jwt.sign(
            {
                id : user.id,
                email : user.email,
                username : user.username
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn : "5m",
            }
        );
        return token;
    }
    catch (err) {
        console.log(err);
    }
    
};

module.exports = generateAccessToken;