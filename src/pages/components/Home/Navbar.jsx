import React from "react";
import LargeDeviceNavbar from "../../smallComponents/Home/LargeDeviceNavbar";
import SmallDeviceNavbar from "../../smallComponents/Home/SmallDeviceNavbar";

const Navbar = () => {
  return (
    <div className="bg-white sticky top-0">
      {/* for large screen */}
      <LargeDeviceNavbar />

      {/* for mobile screen */}
      <SmallDeviceNavbar />
    </div>
  );
};

export default Navbar;
