import React, { useCallback, useEffect, useState } from "react";
import Button from "../../reuseableComponents/Button";
import axios from "axios";

const OrderItem = ({ index, order, activeState, fetchedOrders }) => {
  const [orderUpdated, setOrderUpdated] = useState(false);

  const confirmButtonClassNames =
    "bg-[#FFF700] px-8 rounded-3xl font-semibold py-3";
  const cancelButtonClassNames =
    "bg-[#FF004E] text-white  px-8 rounded-3xl font-semibold py-3";

  const updateOrderStatus = useCallback(
    async (data) => {
      try {
        const response = await axios.patch(
          `https://server-zayanax-limited-task.vercel.app/api/v1/orders/${order?._id}`,
          {
            status: data,
          }
        );
        if (response.status === 200) {
          setOrderUpdated(true);
          await fetchedOrders();
        }
      } catch (error) {}
    },
    [order?._id, fetchedOrders]
  );

  useEffect(() => {
    updateOrderStatus();
  }, [updateOrderStatus]);

  return (
    <div
      className={`${
        activeState === "all" && !orderUpdated
          ? "flex justify-between items-center"
          : "flex gap-96 items-center"
      } py-2 rounded-xl shadow bg-white w-full`}
    >
      <div
        className={`${
          activeState === "all" && orderUpdated
            ? "flex w-[260px] gap-36"
            : "flex w-[260px] gap-36"
        } font-semibold px-6 py-3.5`}
      >
        <p>{index + 1}</p>
        <p>{order?.orderNo && String(order?.orderNo).substring(0, 8)}</p>
      </div>
      <div
        className={`${
          activeState === "all" && !orderUpdated
            ? "pl-24"
            : "w-[260px] pl-10 justify-center items-center"
        } font-semibold`}
      >
        <p>{order?.amount}</p>
      </div>
      <div
        className={`${
          activeState === "all" && !orderUpdated
            ? "flex items-center gap-14"
            : " flex justify-end w-[260px]"
        }`}
      >
        {activeState === "all" &&
          (order?.status === "" || order?.status === "pending") && (
            <div className="flex gap-5 px-6 py-3.5 justify-start">
              <Button
                text="Confirm"
                classNames={confirmButtonClassNames}
                onClick={() => {
                  updateOrderStatus("confirm");
                }}
              />
              <Button
                text="Cancel"
                classNames={cancelButtonClassNames}
                onClick={() => updateOrderStatus("canceled")}
              />
            </div>
          )}
        <div
          className={`${
            activeState === "all" && !orderUpdated
              ? "flex justify-between gap-36"
              : "flex justify-center items-center"
          }`}
        >
          <p className="pr-16 font-semibold">
            {order && order?.status && order?.status !== ""
              ? order?.status.charAt(0).toUpperCase() +
                order?.status.slice(1).toLowerCase()
              : "Pending"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
