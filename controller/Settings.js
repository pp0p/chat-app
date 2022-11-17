const express = require("express");
const router = express.Router();
const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const upload = require('../services/upload_Image')


router.put("/updateProfile", (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(413).send({ message: err.message });
    }
    const { username, _id } = req.body;
    const checkUsername = await User.findOne({ username: username });
    const user = await User.findById(_id);
    if (!checkUsername || checkUsername.username === user.username) {
      user.username = username;
      user.photo = req.file?.filename || user.photo;
      await user.save();
      const token = jwt.sign(
        {
          username: user.username,
          photo: user.photo
            ? `http://${req.hostname}/users_photos/${user.photo}`
            : null,
          _id: user._id,
        },
        process.env.jwtSecret
      );
      return res.status(200).send({ message: "Done Update", token });
    } else if (checkUsername) {
      return res.status(401).send({ message: "username already exist" });
    }

    // update token
  });
});

router.put("/changePassword", async (req, res) => {
  const { currentPass, newPassword, _id } = req.body;
  if (!(currentPass, newPassword)) {
    return res.status(422).send({ message: "Please add all fields" });
  }
  const user = await User.findById(_id);
  const isMatch = await bcrypt.compare(currentPass, user.password);
  if (!isMatch) {
    return res.status(400).send({ message: "Current Password Wrong ! " });
  }

  // hash the new password
  const hashPassword = await bcrypt.hash(newPassword, 10);
  // change and sace the new Passowrd
  user.password = hashPassword;
  await user.save();

  return res.status(200).send({ message: "Done Update" });
});

module.exports = router;
