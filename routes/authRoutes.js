const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/user");
const generateAccessToken = require("../utils/generateAccessToken");
const generateRefreshToken = require("../utils/generateRefreshToken");
const verifyRefreshToken = require("../utils/verifyRefreshToken");

router.use(express.json());

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      const result = await bcrypt.compare(password, user.passwordHash);
      if (result) {
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        return res.status(200).json({ accessToken, refreshToken });
      }
      return res.status(400).send("Password is wrong");
    }
    return res.status(400).send("Email is wrong");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/register", async (req, res) => {
  try {
    const { username, password, email } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      let passwordHash = await bcrypt.hash(password, 10);
      let newUser = new User({
        email,
        username,
        passwordHash,
      });
      await newUser.save();
      let accessToken = generateAccessToken(newUser);
      let refreshToken = generateRefreshToken(newUser);
      return res.status(200).json({ accessToken, refreshToken });
    }
    return res.status(409).send("User already exist!");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/refresh", async (req, res) => {
  try {
    const refreshToken = req.body.refreshToken;
    const result = verifyRefreshToken(refreshToken);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    let user = result.data;
    let newAccessToken = generateAccessToken(user);
    let newRefreshToken = generateRefreshToken(user);
    res.status(200).json({ accessToken : newAccessToken, refreshToken : newRefreshToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
