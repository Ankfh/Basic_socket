let activeUsers = [];

const chatEvent = (io) => {
  io.on("connection", (socket) => {
    console.log(activeUsers);
    console.log("a user connected");

    //create an active user
    socket.on("new_user_add", (userId) => {
      if (userId) {
        if (!activeUsers.some((user) => user.userId === userId)) {
          activeUsers.push({
            userId: userId,
            socketId: socket.id,
          });
        }
      }
      io.emit("get_user", activeUsers);
    });

    ///send message
    socket.on("send_message", (data) => {
      const user = activeUsers.find((user) => user?.userId === data?.userId);
      if (data) {
        if (user && data) {
          io.to(user.socketId).emit("receive_message", data);
        }
        console.log(data, "send messge in backend");
      }
    });

    ////when a user disconnected
    socket.on("disconnect", () => {
      activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
      console.log("user Disconnected");
    });
  });
};

module.exports = chatEvent;
