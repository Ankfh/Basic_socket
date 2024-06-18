import React, { useEffect, useState } from "react";
import { protoBaseUrl } from "../../Api,s/BaseUrl";
import { mediaSoupProcess } from "./logic/MediaSoupLogic";
const { WebSocketTransport, Peer } = require("protoo-client");
const VedioCallPage = () => {
  const [protoPeer, setprotoPeer] = useState();

  const callClick = async () => {
    try {
      await mediaSoupProcess({ protoPeer, sender: true });
    } catch (error) {
      console.log("error in call click", error);
    }
  };

  const attendClick = async () => {
    try {
      await mediaSoupProcess({ protoPeer, sender: false });
    } catch (error) {
      console.log("error in call click", error);
    }
  };

  useEffect(() => {
    const transport = new WebSocketTransport(protoBaseUrl);
    const peer = new Peer(transport);
    setprotoPeer(peer);

    return () => {
      peer.close();
      transport.close();
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-full gap-4 h-screen">
      <div className="w-full border-2 border-red-700 max-w-5xl h-screen max-h-96 "></div>
      <div className=" flex gap-10 ">
        <button onClick={callClick} className="bg-[green] text-white p-3 ">
          call
        </button>
        <button onClick={attendClick} className="bg-[green] text-white p-3 ">
          Attend
        </button>
      </div>
    </div>
  );
};

export default VedioCallPage;
