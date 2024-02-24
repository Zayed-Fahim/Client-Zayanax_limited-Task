import React, { useContext } from "react";
import { orderStateData } from "../../../data/orderStateData";
import OrderContext from "../../../contexts/OrderContext";

const OrderState = () => {
  const { activeState, setActiveState, fetchedOrders } =
    useContext(OrderContext);
  return (
    <div className="flex items-center gap-10 pb-16">
      {orderStateData?.map((data) => (
        <div
          key={data.id}
          onClick={async () => {
            await setActiveState(data?.value);
            await fetchedOrders(data.value);
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
