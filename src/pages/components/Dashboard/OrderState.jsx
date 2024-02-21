import React from "react";

const OrderState = ({ activeState, setActiveState }) => {
  const orderStateData = [
    {
      id: 1,
      name: "All",
      value: "all",
      backgroundColor: "#FFF700",
    },
    {
      id: 2,
      name: "Pending",
      value: "pending",
      backgroundColor: "#0099FF",
    },
    {
      id: 3,
      name: "Confirmed",
      value: "confirm",
      backgroundColor: "#21AA00",
    },
    {
      id: 4,
      name: "Canceled",
      value: "cancel",
      backgroundColor: "#FF004E",
    },
  ];

  return (
    <div className="flex items-center gap-10 pb-16">
      {orderStateData?.map((data) => (
        <div
          key={data.id}
          onClick={() => {
            setActiveState(data?.value);
          }}
          className="cursor-pointer shadow rounded-xl w-[260px] h-[90px] px-5 py-3 font-semibold"
          style={{
            backgroundColor:
              data.value === activeState ? data.backgroundColor : "#FFFFFF",
            color:
              data.value === "all"
                ? "#000000"
                : data.value === activeState
                ? "#FFFFFF"
                : "",
          }}
        >
          {data.name}
        </div>
      ))}
    </div>
  );
};

export default OrderState;
