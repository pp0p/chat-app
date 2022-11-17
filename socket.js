const User = require("./controller/User");
module.exports.Socket = (io) => {
  io.on("connection", (socket) => {
    socket.on("message", (data) => {
      io.emit("messageResponse", data);
    });
    socket.on("activeUser", (user) => {
      User.changeStatus(user, true);
    });
    socket.on("userOut", (user) => {
      User.changeStatus(user.username, false);
    });
    socket.on("PrivateChat", async (data) => {
      await User.InsertMessages(data.user, data.to, data);
      const messages = await User.GetMessages(data.user, data.to);
      io.emit(`PrivateChat`, messages);
    });
  });
};
