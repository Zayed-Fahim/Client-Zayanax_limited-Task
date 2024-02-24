import React, { useContext, useEffect } from "react";
import OrderContext from "../../../contexts/OrderContext";
import OrderItem from "../../smallComponents/Dashboard/OrderItem";
import OrderState from "./OrderState";

const OrdersPage = () => {
  const { orders, activeState, fetchedOrders } = useContext(OrderContext);

  useEffect(() => {
    fetchedOrders(activeState);
  }, [activeState, fetchedOrders]);

  return (
    <div className="w-5/6 pl-3 pr-14 pt-10 overflow-hidden">
      <OrderState />
      <div className="w-full flex flex-col justify-center gap-4 relative">
        <div className="flex text-xl font-semibold items-center justify-start w-full px-3">
          <div className="w-[calc(20%-120px)]">
            <p>SL</p>
          </div>
          <div className="w-[calc(20%+150px)] pl-2">
            <p>Order No</p>
          </div>
          <div className="w-[calc(20%+150px)] pl-2">
            <p>Item Price</p>
          </div>
          <div className="w-1/5 flex justify-center items-center">
            <p>Status</p>
          </div>
          <div className="pl-1">
            <p>Action</p>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <>
            {orders.length <= 0 ? (
              <p className="text-red-500 text-center pt-[100px]">
                No Orders Record Found!
              </p>
            ) : (
              <>
                {orders?.map((order, index) => (
                  <OrderItem order={order} key={index} index={index} />
                ))}
              </>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
