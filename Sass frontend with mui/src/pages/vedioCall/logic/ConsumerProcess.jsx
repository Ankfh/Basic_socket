export const ConsumerProcess = async ({
  consumerTransport,
  protoPeer,
  device,
}) => {
  try {
    consumerTransport.on("connect", async ({ dtlsParameters }, callback) => {
      try {
        const data = await protoPeer.request("connect_consumer_transport", {
          // producerId: producerTransport.id,
          dtlsParameters: dtlsParameters,
        });
        callback();
      } catch (error) {
        console.log("error in producer transport connect", error);
      }
    });

    const data = await protoPeer.request("join", {
      rtpCapabilities: device.rtpCapabilities,
    });
    const consumer = await consumerTransport.consume({
      id: data.id,
      producerId: data.producerId,
      kind: data.kind,
      rtpParameters: data.rtpParameters,
    });
    console.log(data, "data");
    const { track } = consumer;
    console.log(consumer, "data after join");
  } catch (error) {
    console.log("err in cosumerPrcess", error);
  }
};
