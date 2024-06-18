import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProRoutes = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (!token) {
    const items = JSON.parse(token);
    return <Navigate to={"/login"} />;
  }
  return <Outlet />;
};

export default ProRoutes;