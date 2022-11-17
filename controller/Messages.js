const expres = require("express");
const router = expres.Router();
const db = require("../model/userModel");
const User = require("../controller/User");
router.get("/", async (req, res) => {
  try {
    const { sender, receiver } = req.query;
    const messages = await User.GetMessages(sender, receiver);
    res.status(200).send(messages);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
