import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const SidebarItem = ({ item }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleItemClick = () => {
    setOpen(!open);
  };

  return (
    <li
      className={`px-10 font-semibold py-2`}
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
          <IoIosArrowDown
            className={`${open ? "rotate-180 transition-all" : ""}`}
          />
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
