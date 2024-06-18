const { createMediaWorker } = require("../media_Soup/createWorker");
const { addProtoTransport } = require("./protoExtra");
const { protoRequest } = require("./protoRequest");

const protoServerConnection = async (protoServer) => {
  const worker = await createMediaWorker();

  console.log(worker.pid, "after creating");
  protoServer.on("connectionrequest", (info, accept, reject) => {
    try {
      console.log("proto server connected");
      const protoTransport = accept();
      addProtoTransport(protoTransport);
      protoRequest(protoTransport, worker);
      protoTransport.on("close", () => {
        console.log("proto server disconnected");
      });
    } catch (error) {
      console.log(error, "error in mian connection function");
    }
  });
};

//////exports
module.exports = {
  protoServerConnection,
};
