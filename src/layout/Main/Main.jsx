import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../pages/components/Home/Navbar";

const Main = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Main;
