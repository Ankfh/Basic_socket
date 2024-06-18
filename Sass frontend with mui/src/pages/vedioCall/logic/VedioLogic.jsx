import { Device } from "mediasoup-client";

export const createDevice = () => {
  try {
    const mediasoupDevice = new Device();
    return mediasoupDevice;
  } catch (error) {
    console.log("errr while create device", error);
  }
};
