import React, { useEffect, useState } from "react";
import ChatMessge from "../components/ChatMessge";
import { useGetAllUserQuery } from "../features/apiSlice";
import { SignalCellularNullSharp } from "@mui/icons-material";
import UserLIst from "../components/UserLIst";
import MessageView from "../components/MessageView";
import socket from "../Socket/socket";
import { useNavigate } from "react-router";

const HomePage = () => {
  const [selectUserId, setselectUserId] = useState(null);
  const [notify, setnotify] = useState(false);
  const [message, setmessage] = useState();
  const [receiveMessage, setreceiveMessage] = useState([]);
  const [activeUser, setactiveUser] = useState();
  const navigate = useNavigate();
  const { data: allUser } = useGetAllUserQuery();
  const id = JSON.parse(localStorage.getItem("userId"));
  const [loginUserId, setloginUserId] = useState(
    JSON.parse(localStorage.getItem("userId"))
  );
  console.log(id, "id");

  let AllUser = allUser?.AllUser?.filter((item) => item._d !== id);
  console.log(AllUser, "alluser");

  useEffect(() => {
    socket.emit("new_user_add", loginUserId);
    socket.on("get_user", (user) => {
      console.log(user, "active user inside effect");
      setactiveUser(user);
    });
  }, [loginUserId]);

  ///useEffect for sennddig message
  useEffect(() => {
    if (message !== null) {
      socket.emit("send_message", message);
    }
  }, [message]);

  ///useEffect for REceiving message
  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data, "data in effecy");
      // setreceiveMessage(data);
      setreceiveMessage((list) => [...list, { ...data }]);
      setnotify(true);
    });
  }, []);

  const onLogoutClick = () => {
    localStorage.clear();
  };

  return (
    <div className="flex w-full">
      <div className="w-full">
        <UserLIst allUser={AllUser} setselectUserId={setselectUserId} />
      </div>
      <div className="flex h-screen flex-col w-full justify-center items-center">
        <div>
          <MessageView receiveMessage={receiveMessage} />
        </div>
        <div className="w-full flex justify-end pr-5">
          <button className="bg-[red] text-white p-3 " onClick={onLogoutClick}>
            LogOut
          </button>
        </div>
        <div>
          <ChatMessge selectUserId={selectUserId} setmessage={setmessage} />
        </div>

        <button
          className="bg-[green] text-white p-3 "
          onClick={() => navigate("/videocall")}
        >
          Video Call
        </button>
      </div>
    </div>
  );
};

export default HomePage;
