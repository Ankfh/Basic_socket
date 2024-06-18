import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = (props) => {
  const token = localStorage.getItem("token");
  // console.log(token)
  if (token) {
    // const items = JSON.parse(token);
    return <Navigate to={"/"} />;
  }
  return <Outlet />;
};

export default PublicRoute;
