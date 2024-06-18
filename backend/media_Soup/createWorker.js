const { createWorker } = require("mediasoup");

const createMediaWorker = async () => {
  const workerSettings = {
    rtcMinPort: 10000,
    rtcMaxPort: 20000,
  };
  const worker = await createWorker(workerSettings);

  worker.on("died", () => {
    console.error("mediasoup Worker died");
    process.exit(1);
  });

  return worker;
};

module.exports = { createMediaWorker };
