const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../model/userModel");
const upload = require('../services/upload_Image')
router.post("/", async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(413).send({ message: err.message });
      }
      const { username, password } = req.body;
      if (!(username, password)) {
        return res.status(422).send({ message: "Please add all fields" });
      }
      const checkUsername = await User.findOne({ username });
      if (checkUsername) {
        
        return res.status(401).send({ message: "username already exist" });
      }

      // Create New User
      const hashPassword = await bcrypt.hash(password, 10);
      const user = new User({
        username,
        password: hashPassword,
        status: true,
        chat: [],
        photo: req.file?.filename || '',
      });
      await user.save();
      const token = user.genAuthToken(req.hostname);
      return res.status(201).send({ message: "Done Register", token: token });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
