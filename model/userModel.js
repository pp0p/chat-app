const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: Boolean,
  },
  chat: {
    type: Array,
  },
  photo: {
    type: String,
  },
});
UserSchema.methods.genAuthToken = function (host) {
  const token = jwt.sign(
    {
      username: this.username,
      photo: this.photo ? `http://${host}/users_photos/${this.photo}` : null,
      _id: this._id,
    },
    process.env.jwtSecret
  );
  return token;
};
const User = mongoose.model("users", UserSchema);
module.exports = User;
