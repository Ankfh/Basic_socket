const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { createServer } = require("http");
const { Server } = require("socket.io");
const path = require("path");
const fileupload = require("express-fileupload");
const protooServer = require("protoo-server");

//routers
const userRouter = require("./routes/user");

const options = {
  maxReceivedFrameSize: 960000, // 960 KBytes.
  maxReceivedMessageSize: 960000,
  fragmentOutgoingMessages: true,
  fragmentationThreshold: 960000,
};

const connectDB = require("./db");
const chatEvent = require("./sockets/chatEvent");
const { protoRequest } = require("./protoo/protoRequest");
const { protoServerConnection } = require("./protoo/protoServerConnection");
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
const server = createServer(app);

///////////////protoo server
const protoServer = new protooServer.WebSocketServer(server, options);
protoServerConnection(protoServer);
app.use(
  fileupload({
    // limits: { fileSize: 2 * 1024 * 1024 }, // 2mb
    // abortOnLimit: true, // if limit is reached return 413
    createParentPath: true,
    useTempFiles: true,
  })
);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

chatEvent(io);

app.use("/public", express.static(path.join(__dirname, "/public")));
// app.use(express.static(path.join(__dirname, 'build')));

app.use("/user", userRouter);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`server is running 0n localhost:${port}`);
});
