import { ConsumerProcess } from "./ConsumerProcess";
import { ProducerProcess } from "./ProducerLogic";
import { createDevice } from "./VedioLogic";

export const mediaSoupProcess = async ({ protoPeer, sender }) => {
  let producerTransport;
  let consumerTransport;
  try {
    const router = await protoPeer.request("create_router");
    const device = createDevice();

    const rtp = await protoPeer.request("get_rtp");
    await device.load({ routerRtpCapabilities: rtp });
    const { params } = await protoPeer.request("create_webRtc_transport", {
      sender: sender,
      receiver: sender,
    });
    if (sender) {
      producerTransport = device.createSendTransport(params);
      await ProducerProcess({ producerTransport, protoPeer });
    } else {
      consumerTransport = device.createRecvTransport(params);
      await ConsumerProcess({ consumerTransport, protoPeer, device });
    }
  } catch (error) {
    console.log("error in madia Process ", error);
  }
};
