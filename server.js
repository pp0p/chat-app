const express = require("express");
const app = express();
const http = require("http").Server(app);
const dotenv = require("dotenv");
dotenv.config(); //read environment variables
const router = require("./router/router");
const dbConnect = require("./config/db");
const { Socket } = require("./socket");

const helmet = require("helmet");
const cors = require("cors");
const PORT = process.env.PORT;
const io = require("socket.io")(http, {
  cors: {
    // add your website link here 
    origin: "*",
  },
});
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use(cors());
// socket
Socket(io);

// connect to database
dbConnect();
app.use("/api", router);

app.use("*", (req, res) => {
  res.status(404).send({
    message: "Not Found",
  });
});
http.listen(PORT, () => console.log(`App Runin on Port ${PORT}`));
