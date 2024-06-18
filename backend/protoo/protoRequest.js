const { Room } = require("protoo-server");
const { getProtoTransport } = require("./protoExtra");
const { routerMediaSoup } = require("../media_Soup/createRouter");
const {
  addRouter,
  getRouter,
  getTransport,
  getPoducer,
  addProducer,
} = require("../media_Soup/mediaSoupExtra");
const {
  createWebRtcTransport,
} = require("../media_Soup/createWebRtcTransport");
const { Producer } = require("mediasoup/node/lib/Producer");

const protoRequest = (protoTransport, worker) => {
  const room = new Room();
  const peer = room.createPeer("1", protoTransport);

  let comsumerTransport;
  peer.on("request", async (request, accept, reject) => {
    try {
      switch (request.method) {
        case "create_router": {
          const router = getRouter();
          if (router) {
            accept(router);
          } else {
            const RouterMedia = await routerMediaSoup(worker);
            addRouter(RouterMedia);
            accept(RouterMedia);
          }

          break;
        }

        case "get_rtp": {
          const router = getRouter();
          accept(router.rtpCapabilities);
          break;
        }

        case "create_webRtc_transport": {
          const { sender } = request.data;
          console.log(request.data);
          if (sender) {
            await createWebRtcTransport(accept);
          } else {
            // comsumerTransport = await createWebRtcTransport(accept);

            let transport = getTransport();
            if (transport) {
              accept({
                params: {
                  id: transport.id,
                  iceParameters: transport.iceParameters,
                  iceCandidates: transport.iceCandidates,
                  dtlsParameters: transport.dtlsParameters,
                },
              });
            } else {
              accept({ message: "no producer" });
            }
          }
          break;
        }

        case "connect_producer_transport": {
          let transport = getTransport();
          const { dtlsParameters } = request.data;
          await transport.connect({ dtlsParameters });
          accept();
          break;
        }

        case "connect_consumer_transport": {
          let transport = getTransport();
          const { dtlsParameters } = request.data;
          console.log(dtlsParameters, "inside the consumer connect");

          await transport.connect({ dtlsParameters });
          accept();
          break;
        }

        case "transport_produce": {
          let transport = getTransport();

          const { transportId, kind, rtpParameters, appData } = request.data;
          if (kind === "video") {
            const vedioPoducer = await transport.produce({
              kind,
              rtpParameters,
              appData,
            });
            addProducer(vedioPoducer);
            accept({ id: vedioPoducer.id });
          }

          if (kind === "audio") {
            const audioProducer = await transport.produce({
              kind,
              rtpParameters,
              appData,
            });
            addProducer(audioProducer);
            accept({ id: audioProducer.id });
          }

          break;
        }

        case "join": {
          const allProducers = getPoducer();
          let transport = getTransport();
          const router = getRouter();
          const { rtpCapabilities } = request.data;
          console.log(comsumerTransport, "transport");
          for (const eachProducer of allProducers) {
            console.log(
              router.canConsume({
                producerId: eachProducer.id,
                rtpCapabilities,
              })
            );
            if (
              router.canConsume({
                producerId: eachProducer.id,
                rtpCapabilities,
              })
            ) {
              let transport = getTransport();
              const consumer = await transport.consume({
                producerId: eachProducer.id,
                rtpCapabilities,
                paused: true,
              });

              const params = {
                id: consumer.id,
                producerId: eachProducer.id,
                kind: consumer.kind,
                rtpParameters: consumer.rtpParameters,
              };

              accept(params);
              consumer.on("transportclose", () => {
                console.log("transport closed");
              });
            }
          }

          break;
        }

        default:
          break;
      }
    } catch (error) {
      console.log("error in request", error);
    }
  });

  peer.on("close", () => {
    console.log("Peer connection closed");
  });
};

//////exports
module.exports = {
  protoRequest,
};
