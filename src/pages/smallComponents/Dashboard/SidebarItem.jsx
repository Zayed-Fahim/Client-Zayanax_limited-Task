import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";

const SidebarItem = ({ item }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const isActive = () => {
    if (item?.path && item?.path === pathname) {
      return true;
    } else if (!item.path) {
      return false;
    } else if (
      item?.submenu &&
      item?.submenu.length > 0 &&
      item?.submenu.some((subItem) => subItem.path === pathname)
    ) {
      return true;
    }
    return false;
  };
  const handleItemClick = () => {
    setOpen(!open);
  };

  return (
    <li
      className={` ${isActive() ? "font-bold" : "font-semibold"} px-10 py-2`}
      onClick={() => {
        if (item.path) {
          navigate(item?.path);
        } else if (item.submenu.length > 0 && item.submenu.path) {
          navigate(item.submenu.path);
        }
      }}
    >
      <div
        onClick={handleItemClick}
        className="flex items-center justify-between cursor-pointer"
      >
        <span>{item.title}</span>
        {item.submenu?.length > 0 && (
          <IoIosArrowDown className={`${open ? "rotate-180" : ""}`} />
        )}
      </div>
      {open && item.submenu?.length > 0 && (
        <ul>
          {item.submenu.map((subMenuItem, index) => (
            <SidebarItem key={index} item={subMenuItem} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default SidebarItem;
