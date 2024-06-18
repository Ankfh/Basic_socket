const routerMediaSoup = async (worker) => {
  try {
    const router = await worker.createRouter({
      mediaCodecs: [
        {
          kind: "audio",
          mimeType: "audio/opus",
          clockRate: 48000,
          channels: 2,
        },
        {
          kind: "video",
          mimeType: "video/VP8",
          clockRate: 90000,
          parameters: {
            "x-google-start-bitrate": 1000,
          },
        },
      ],
    });
    return router;
  } catch (error) {
    console.log("error in router ", error);
  }

  router.on("close", () => {
    console.error("mediasoup Router closed");
    // Additional cleanup or handling can be done here
  });
};

module.exports = {
  routerMediaSoup,
};
