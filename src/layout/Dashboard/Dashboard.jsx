import React from "react";
import Navbar from "../../pages/components/Dashboard/Navbar";
import Sidebar from "../../pages/components/Dashboard/Sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="h-screen overflow-y-auto relative">
      <Navbar />
      <div className="flex gap-5">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
