const express = require("express");
const router = express.Router();

const Db = require("../model/userModel");
router.get("/", (req, res) => {
  try {
    Db.find({}, function (err, users) {
      let usersList = []; 
      
      users.forEach((u) =>
        usersList.push({
          username: u.username,
          status: u.status,
          photo: u.photo
            ? `http://${req.hostname}/users_photos/${u.photo}`
            : null,
        })
      );
      return res.send(usersList);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
