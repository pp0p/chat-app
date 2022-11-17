const db = require("../model/userModel");

module.exports.changeStatus = async function (user, status) {
  try {
    const currentUser = await db.findOne({ username: user });
    currentUser.status = status;
    await currentUser.save();
  } catch (error) {
    console.log(error);
  }
};
module.exports.GetMessages = async function (sender, receiver) {
  try {
    const FindChat = await db.findOne({ username: sender });
    const senderMessages = FindChat.chat;

    let messages = [];
    senderMessages.forEach((message) => {
      if (
        (message.user === sender && message.to === receiver) ||
        (message.user === receiver && message.to === sender)
      ) {
        messages.push(message);
      }
    });
    return messages;
  } catch (error) {
    console.log(error);
  }
};
module.exports.InsertMessages = async function (sender, receiver, message) {
  try {
    const findSender = await db.findOne({ username: sender });
    const findReceiver = await db.findOne({ username: receiver });

    let senderMessages = findSender.chat;
    let receiverMessages = findReceiver.chat;

    senderMessages.push(message);
    receiverMessages.push(message);

    findSender.chat = senderMessages;
    findReceiver.chat = receiverMessages;
    await findSender.save();
    await findReceiver.save();
    senderMessages = [];
    receiverMessages = [];
  } catch (error) {
    console.log(error);
  }
};
