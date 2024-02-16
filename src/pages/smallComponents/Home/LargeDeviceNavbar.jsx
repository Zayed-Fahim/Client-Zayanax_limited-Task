import React from "react";
import { RiSearch2Line, RiShoppingCartLine, RiUserLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const LargeDeviceNavbar = () => {
  const navigate = useNavigate();
  return (
    <div className="hidden md:block py-4 border-b border-gray-300">
      <nav className="md:mx-[2rem] lg:mx-[6rem] flex justify-between">
        {/* logo section */}
        <div
          className="cursor-pointer text-4xl font-semibold"
          onClick={() => navigate("/")}
        >
          <h1>Test Logo</h1>
        </div>
        {/* search bar */}
        <div className="flex justify-center items-center relative border-b border-gray-400 w-2/4 h-10">
          <RiSearch2Line className="absolute left-0 w-6 h-6 text-gray-400" />
          <input
            type="text"
            className="focus:outline-none text-sm w-full pl-8"
            placeholder="Search..."
          />
        </div>
        {/* cart and account section */}
        <div className="flex justify-center items-center md:gap-5 lg:gap-12">
          <div className="flex justify-center items-center gap-2">
            <RiShoppingCartLine className="w-7 h-7 lg:w-9 lg:h-9 cursor-pointer" />
            <div className="flex justify-center items-center lg:text-[1.3rem] gap-2 font-semibold cursor-pointer">
              Cart
              <div className="h-5 w-5 lg:h-6 lg:w-6 bg-yellow-300 rounded-[50%] flex justify-center items-center animate-bounce animation-delay-100">
                <span className="lg:text-[1.3rem]">0</span>
              </div>
            </div>
          </div>
          <RiUserLine className="w-6 h-6 lg:w-8 lg:h-8 cursor-pointer" />
        </div>
      </nav>
    </div>
  );
};

export default LargeDeviceNavbar;
