import React, { useContext } from "react";
import { RiSearch2Line, RiShoppingCartLine, RiUserLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import CommonContext from "../../../contexts/CommonContext";
import ProductSearchContext from "../../../contexts/ProductSearchContext";

const LargeDeviceNavbar = () => {
  const navigate = useNavigate();
  const { cart } = useContext(CommonContext);
  const { handleSearchChange } = useContext(ProductSearchContext);

  return (
    <div className="hidden md:block py-4 border-b border-gray-300">
      <nav className="md:mx-[4rem] lg:mx-[6rem] flex justify-between">
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
            onChange={handleSearchChange}
            placeholder="Search..."
          />
        </div>
        {/* cart and account section */}
        <div className="flex justify-center items-center md:gap-5 lg:gap-12">
          <div className="flex justify-center items-center gap-2">
            <RiShoppingCartLine
              className="w-7 h-7 lg:w-9 lg:h-9 cursor-pointer"
              onClick={() => navigate("/cart")}
            />
            <div
              className="flex justify-center items-center lg:text-[1.3rem] gap-2 font-semibold cursor-pointer"
              onClick={() => navigate("/cart")}
            >
              Cart
              <div className="h-4 w-4 lg:h-5 lg:w-5 bg-[#FFF700] rounded-[50%] flex justify-center items-center">
                <span className="text-[1rem]">{cart ? cart?.length : 0}</span>
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
