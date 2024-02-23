import React, { useContext, useState } from "react";
import {
  RiMenu3Line,
  RiSearch2Line,
  RiShoppingCartLine,
  RiUserLine,
} from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import CommonContext from "../../../contexts/CommonContext";
import ProductSearchContext from "../../../contexts/ProductSearchContext";

const SmallDeviceNavbar = () => {
  const navigate = useNavigate();
  const { cart } = useContext(CommonContext);
  const { handleSearchChange } = useContext(ProductSearchContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="block md:hidden w-full relative py-3 border-b border-gray-300">
      <nav className="mx-[1.5rem]">
        <div className="cursor-pointer text-[25px] font-semibold flex justify-between items-center relative">
          {/* logo section */}
          <h1 onClick={() => navigate("/")}>Test Logo</h1>
          {/* search bar */}
          <div className="flex justify-center items-center relative border-b w-2/4 border-gray-400 h-10">
            <RiSearch2Line className="absolute left-0 w-5 h-5 text-gray-400" />
            <input
              type="text"
              className="focus:outline-none text-sm w-full pl-8"
              placeholder="Search..."
              onChange={handleSearchChange}
            />
          </div>
          {/* menubar */}
          {isOpen ? (
            <RxCross2 onClick={handleToggle} className="h-7 w-7" />
          ) : (
            <RiMenu3Line onClick={handleToggle} className="h-7 w-7" />
          )}
        </div>

        <div
          className={`${
            isOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
          } absolute top-[101%] left-0 w-full px-10 py-2 bg-white drop-shadow-2xl transition-all duration-300 transform origin-top`}
        >
          {/* cart and account section */}
          <div className="flex flex-col gap-">
            <div className="flex justify-start items-center py-3 border-b border-gray-300 gap-2">
              <RiShoppingCartLine
                className="w-7 h-7 cursor-pointer"
                onClick={() => navigate("/cart")}
              />
              <div
                onClick={() => navigate("/cart")}
                className="flex justify-center items-center gap-2 text-xl font-semibold cursor-pointer"
              >
                Cart
                <div className="h-5 w-5 bg-[#FFF700] rounded-[50%] flex justify-center items-center">
                  <span className="text-[1rem]">{cart ? cart?.length : 0}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3 py-3 justify-start items-center cursor-pointer">
              <span className="text-xl font-semibold">Account</span>
              <RiUserLine className="w-6 h-6" />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default SmallDeviceNavbar;
