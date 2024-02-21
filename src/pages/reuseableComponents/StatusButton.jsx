import React from "react";

const StatusButton = ({ firstText, secondText, isChecked, setIsChecked }) => {
  const handleChecked = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div className="flex justify-between items-center">
      <h1 className="font-semibold">Active</h1>
      <div>
        <label
          htmlFor="switcher"
          className="flex justify-center cursor-pointer mt-4"
        >
          <div className="relative flex justify-between w-28 h-8 border rounded-3xl">
            <input
              id="switcher"
              type="checkbox"
              className="hidden peer"
              onChange={handleChecked}
            />
            <span className="w-5 h-full font-semibold pt-0.5 text-center flex-grow relative z-20 self-center transition text-white peer-checked:text-gray-400">
              {firstText}
            </span>
            <span className="w-5 h-full font-semibold pt-0.5 text-center flex-grow relative z-20 self-center transition peer-checked:text-white">
              {secondText}
            </span>
            <span
              className={`absolute toggle z-10 h-full w-14 rounded-3xl transition-all top-0 left-0 peer-checked:left-[calc(100%-56px)] ${
                isChecked ? "bg-[#00B55B]" : "bg-[#EF0031]"
              }`}
            />
          </div>
        </label>
      </div>
    </div>
  );
};

export default StatusButton;
