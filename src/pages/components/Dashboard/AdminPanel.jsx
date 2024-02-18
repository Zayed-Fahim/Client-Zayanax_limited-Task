import React from "react";
import AdminPanelForm from "../../smallComponents/Dashboard/AdminPanelForm";

const AdminPanel = () => {
  return (
    <div className="flex flex-col gap-7 justify-center items-center w-full h-screen">
      <h1 className="text-3xl font-semibold">Admin Panel</h1>
      <div className="bg-white p-5 rounded-xl flex flex-col gap-5 xl:w-1/3 2xl:w-1/6 shadow">
        <AdminPanelForm />
      </div>
      <div className="xl:w-1/3 2xl:w-1/6 h-max p-5 border border-black border-opacity-45 rounded-xl flex gap-3 flex-col">
        <h1 className="font-semibold text-black">
          Use the following credentials to login
        </h1>
        <span>
          <h1 className="font-semibold">User ID</h1>
          <h1>Test_User2020</h1>
        </span>
        <span>
          <h1 className="font-semibold">Password</h1>
          <h1>Easy_123</h1>
        </span>
      </div>
    </div>
  );
};

export default AdminPanel;
