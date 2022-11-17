const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!(username, password)) {
      return res.status(422).json({ error: "Please add all fields" });
    }
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(400).send({ message: "username does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: "invalid Password ! " });
    }
    user.status = true;
    await user.save();
    // create token for user
    const token = jwt.sign(
      {
        username: user.username,
        photo: `https:/${req.hostname}/users_photos/${user.photo}`,
        _id: user._id,
      },
      process.env.jwtSecret
    );
    res.status(200).send({ token });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
