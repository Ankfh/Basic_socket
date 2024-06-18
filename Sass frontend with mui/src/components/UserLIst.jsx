import React from "react";

const UserLIst = ({ allUser, setselectUserId }) => {
  const userClick = (userId) => {
    setselectUserId(userId);
  };
  return (
    <div className=" w-full flex flex-col gap-2 max-w-[214px] ">
      {allUser?.map((user) => (
        <div className="border-2 cursor-pointer border-red-700">
          <p onClick={() => userClick(user._id)}>{user.email}</p>
        </div>
      ))}
    </div>
  );
};

export default UserLIst;
