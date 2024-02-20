import React from "react";
import { sidebarData } from "../../../data/sidebarData";
import SidebarItem from "../../smallComponents/Dashboard/SidebarItem";

const Sidebar = () => {
  return (
    <aside className="border-r border-gray-300 bg-white py-10 !w-1/6 h-[calc(100vh-73px)] sticky top-[73px] left-0">
      <ul>
        {sidebarData.map((item, index) => (
          <SidebarItem item={item} key={index} />
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
