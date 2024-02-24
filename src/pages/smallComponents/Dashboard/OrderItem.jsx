import axios from "axios";
import React, { useContext } from "react";
import OrderContext from "../../../contexts/OrderContext";
import Button from "../../reuseableComponents/Button";

const OrderItem = ({ index, order }) => {
  const { activeState, fetchedOrders } = useContext(OrderContext);

  const confirmButtonClassNames =
    "bg-[#FFF700] px-8 rounded-3xl shadow font-semibold py-3";
  const cancelButtonClassNames =
    "bg-[#FF004E] text-white shadow  px-8 rounded-3xl font-semibold py-3";

  const updateOrderStatus = async (data) => {
    try {
      const response = await axios.patch(
        `https://server-zayanax-limited-task.vercel.app/api/v1/orders/${order?._id}`,
        {
          status: data,
        }
      );
      if (response.status === 200) {
        await fetchedOrders(activeState);
      }
    } catch (error) {}
  };

  return (
    <div className="py-5 rounded-xl shadow bg-white flex items-center justify-start w-full font-semibold pl-5">
      <div className="w-[calc(20%-120px)]">
        <p>{index + 1}</p>
      </div>

      <div className="w-[calc(20%+150px)]">
        <p>{order?.orderNo && String(order?.orderNo).substring(0, 9)}</p>
      </div>

      <div className="w-[calc(20%+150px)]">
        <p>{order?.amount}</p>
      </div>

      <div className="w-1/5">
        {activeState === "all" &&
          (order?.status === "" || order?.status === "pending") && (
            <div className="flex gap-5 px-6 justify-start">
              <Button
                onClick={() => updateOrderStatus("confirm")}
                text="Confirm"
                classNames={confirmButtonClassNames}
              />
              <Button
                onClick={() => updateOrderStatus("canceled")}
                text="Cancel"
                classNames={cancelButtonClassNames}
              />
            </div>
          )}
      </div>

      <div>
        <p className="pr-16 font-semibold">
          {order && order?.status && order?.status !== ""
            ? order?.status.charAt(0).toUpperCase() +
              order?.status.slice(1).toLowerCase()
            : "Pending"}
        </p>
      </div>
    </div>
  );
};

export default OrderItem;
