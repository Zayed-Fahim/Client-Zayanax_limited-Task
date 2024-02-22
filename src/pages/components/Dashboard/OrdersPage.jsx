import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import OrderItem from "../../smallComponents/Dashboard/OrderItem";
import OrderState from "./OrderState";

const OrdersPage = () => {
  const [activeState, setActiveState] = useState("all");
  const [orders, setOrders] = useState([]);

  const fetchedOrders = useCallback(async (activeState) => {
    try {
      const response = await axios.get(
        `https://server-zayanax-limited-task.vercel.app/api/v1/orders?status=${activeState}`
      );

      if (response.status === 200) {
        setOrders(
          response?.data && response?.data?.payload?.length > 0
            ? response?.data?.payload
            : []
        );
      } else {
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
    }
  }, []);

  useEffect(() => {
    fetchedOrders(activeState);
  }, [fetchedOrders, activeState]);
  return (
    <div className="w-5/6 pl-3 pr-14 pt-10 overflow-hidden">
      <OrderState
        setActiveState={setActiveState}
        fetchedOrders={fetchedOrders}
        activeState={activeState}
      />
      <div className="w-full flex flex-col justify-center gap-4">
        <div className="flex justify-between items-center lg:text-xl font-semibold px-2.5">
          <div className="flex justify-between items-center gap-x-36">
            <p>SL</p>
            <p>Order No</p>
          </div>
          <div>
            <p>Item Price</p>
          </div>
          <div className="flex justify-between items-center gap-x-44 pr-16">
            <p>Action</p>
            <p>Status</p>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <>
            {orders.length <= 0 ? (
              <p className="text-center font-semibold text-red-500 pt-[100px]">
                Ops!! No orders record found!
              </p>
            ) : (
              orders?.map((order, index) => (
                <OrderItem
                  fetchedOrders={fetchedOrders}
                  order={order}
                  key={index}
                  index={index}
                  activeState={activeState}
                />
              ))
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
