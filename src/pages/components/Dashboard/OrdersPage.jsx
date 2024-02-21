import axios from "axios";
import React, { useEffect, useState } from "react";
import OrderFetchingLoader from "../../smallComponents/Dashboard/OrderFetchingLoader";
import OrderItem from "../../smallComponents/Dashboard/OrderItem";
import OrderState from "./OrderState";

const OrdersPage = () => {
  const [activeState, setActiveState] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchedOrders = async () => {
      setIsLoading(true);
      try {
        let url;
        if (activeState === "all") {
          url = "https://server-zayanax-limited-task.vercel.app/api/v1/orders";
        }

        if (activeState !== "all") {
          url = `https://server-zayanax-limited-task.vercel.app/api/v1/orders?status=${activeState}`;
        }

        const response = await axios.get(url);

        if (response.status === 200 && response?.data?.payload.length > 0) {
          setOrders(response?.data?.payload);
          setIsLoading(false);
        } else {
          setOrders([]);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchedOrders();
  }, [activeState]);

  return (
    <div className="w-5/6 pl-3 pr-14 pt-10 overflow-hidden">
      <OrderState setActiveState={setActiveState} activeState={activeState} />
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
        <div>
          {isLoading ? (
            <OrderFetchingLoader />
          ) : (
            <>
              {orders.length <= 0 ? (
                <p className="text-center font-semibold">
                  No orders record found
                </p>
              ) : (
                orders?.map((order, index) => (
                  <OrderItem
                    setIsLoading={setIsLoading}
                    order={order}
                    key={index}
                    index={index}
                    activeState={activeState}
                  />
                ))
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
