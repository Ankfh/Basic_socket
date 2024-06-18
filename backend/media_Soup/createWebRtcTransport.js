const { addTransport, getRouter } = require("./mediaSoupExtra");

const createWebRtcTransport = async (accept) => {
  const router = getRouter();
  try {
    const transport = await router.createWebRtcTransport({
      listenIps: [{ ip: "192.168.100.187", announcedIp: "192.168.100.187" }],
      enableUdp: true,
      enableTcp: true,
      preferUdp: true,
      enableSctp: false,
    });
    addTransport(transport);
    accept({
      params: {
        id: transport.id,
        iceParameters: transport.iceParameters,
        iceCandidates: transport.iceCandidates,
        dtlsParameters: transport.dtlsParameters,
      },
    });
    transport.on("dtlsstatechange", (dtlsState) => {
      console.log(`dtls changes`, dtlsState);
    });

    transport.on("close", () => {
      console.error("mediasoup WebRtcTransport closed");
      // Additional cleanup or handling can be done here
    });
    return transport;
  } catch (error) {
    console.log("Error in creating web rtc tranport", error);
  }
};

module.exports = { createWebRtcTransport };
