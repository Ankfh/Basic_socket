import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import * as yup from "yup";
import { EnterButton, MuiTextfield } from "../muiStyle/NavbarStyle";
import socket from "../Socket/socket";
import { useGetAllUserQuery } from "../features/apiSlice";

const schema = yup.object().shape({
  message: yup.string().required("Enter message"),
});

const ChatMessge = ({ selectUserId, setmessage }) => {
  const { data: allUser } = useGetAllUserQuery();
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const formSubmit = (data) => {
    data = { ...data, userId: selectUserId };
    console.log(selectUserId, "user in home");

    setmessage(data);

    console.log(data, "dataa");

    //   LoginUser(data)
    //     .unwrap()
    //     .then((res) => {
    //       if (res?.success === true) {
    //         localStorage.setItem("token", JSON.stringify(res.token));
    //         localStorage.setItem("userEmail", JSON.stringify(res.user.email));
    //         navigate("/");
    //         // reset();
    //       }
    //       console.log(res, "ressss");
    //     });
  };

  const roomButtonClick = () => {
    socket.emit("room", "6");
  };

  return (
    <div>
      {selectUserId ? (
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="flex flex-col justify-center gap-5 ">
            <Controller
              name="message"
              control={control}
              render={({ field, fieldState }) => <MuiTextfield {...field} />}
            />
            <EnterButton type="submit">Send</EnterButton>
          </div>
        </form>
      ) : null}
    </div>
  );
};

export default ChatMessge;
