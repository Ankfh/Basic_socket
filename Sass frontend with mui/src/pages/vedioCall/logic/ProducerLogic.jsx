import { GetMedia } from "./GetMedia";

export const ProducerProcess = async ({ producerTransport, protoPeer }) => {
  producerTransport.on("connect", async ({ dtlsParameters }, callback) => {
    try {
      const rtp = await protoPeer.request("connect_producer_transport", {
        // producerId: producerTransport.id,
        dtlsParameters: dtlsParameters,
      });
      callback();
    } catch (error) {
      console.log("error in producer transport connect", error);
    }
  });

  producerTransport.on("produce", async (parameters, callback) => {
    const { kind, rtpParameters, appData } = parameters;
    try {
      const { id } = await protoPeer.request("transport_produce", {
        transportId: producerTransport.id,
        kind: kind,
        rtpParameters: rtpParameters,
        appData: appData,
      });
      console.log("porducer id ", id);
      callback(id);
    } catch (error) {
      console.log("error in producer transport connect", error);
    }
  });
  const { videoTrack, audioTrack } = await GetMedia();
  console.log(videoTrack);

  if (videoTrack) {
    await producerTransport.produce({ track: videoTrack });
  }
  if (videoTrack) {
    await producerTransport.produce({ track: audioTrack });
  }
};
