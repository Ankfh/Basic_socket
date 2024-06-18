import React from "react";

const MessageView = ({ receiveMessage }) => {
  console.log(receiveMessage, "message in view");
  return (
    <div>
      {receiveMessage.map((item) => (
        <div>
          <p>{item.message}</p>
        </div>
      ))}
    </div>
  );
};

export default MessageView;
