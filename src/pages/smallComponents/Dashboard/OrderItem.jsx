import React, { useState } from "react";
import Button from "../../reuseableComponents/Button";
import axios from "axios";

const OrderItem = ({ index, order, activeState, setIsLoading }) => {
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderCanceled, setOrderCanceled] = useState(false);

  const confirmButtonClassNames =
    "bg-[#FFF700] px-8 rounded-3xl font-semibold py-3";
  const cancelButtonClassNames =
    "bg-[#FF004E] text-white  px-8 rounded-3xl font-semibold py-3";

  const confirmOrder = async () => {
    setIsLoading(true);
    try {
      const response = await axios.patch(
        `https://server-zayanax-limited-task.vercel.app/api/v1/orders/confirm-order/${order._id}`
      );
      if (response.status === 200) {
        setOrderConfirmed(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error confirming order:", error);
      setIsLoading(false);
    }
  };

  const cancelOrder = async () => {
    setIsLoading(true);
    try {
      const response = await axios.patch(
        `https://server-zayanax-limited-task.vercel.app/api/v1/orders/cancel-order/${order._id}`
      );
      if (response.status === 200) {
        setOrderCanceled(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error canceling order:", error);
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`${
        activeState === "all" && !(orderConfirmed || orderCanceled)
          ? "flex justify-between items-center"
          : "flex gap-96 items-center"
      } py-2 rounded-xl shadow bg-white w-full`}
    >
      <div
        className={`${
          activeState === "all" && !(orderConfirmed || orderCanceled)
            ? "flex w-[260px] gap-36"
            : "flex w-[260px] gap-36"
        } font-semibold px-6 py-3.5`}
      >
        <p>{index + 1}</p>
        <p>{order?.orderNo && String(order?.orderNo).substring(0, 8)}</p>
      </div>
      <div
        className={`${
          activeState === "all" && !(orderConfirmed || orderCanceled)
            ? "pl-24 font-semibold"
            : "w-[260px] pl-10 justify-center items-center"
        }`}
      >
        <p>{order?.amount}</p>
      </div>
      <div
        className={`${
          activeState === "all"
            ? "flex items-center gap-14"
            : " flex justify-end w-[260px]"
        }`}
      >
        {activeState === "all" &&
          (orderConfirmed || orderCanceled) &&
          (order?.status === "" || order?.status === "pending")(
            <div className="flex gap-5 px-6 py-3.5 justify-start">
              <Button
                text="Confirm"
                classNames={confirmButtonClassNames}
                onClick={confirmOrder}
              />
              <Button
                text="Cancel"
                classNames={cancelButtonClassNames}
                onClick={cancelOrder}
              />
            </div>
          )}
        <div
          className={`${
            activeState === "all" ? "flex justify-between gap-36" : ""
          }`}
        >
          <p className="pr-16 font-semibold">
            {order && order?.status
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
