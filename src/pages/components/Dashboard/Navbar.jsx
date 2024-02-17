import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="py-4 border-b border-gray-300 sticky top-0 bg-white">
      <nav className="md:mx-[2rem] lg:mx-[6rem] flex justify-between items-center">
        <div
          className="cursor-pointer text-4xl font-semibold"
          onClick={() => navigate("/dashboard")}
        >
          <h1>Test Logo</h1>
        </div>
        <div className="font-semibold">
          <h1>User Name</h1>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
