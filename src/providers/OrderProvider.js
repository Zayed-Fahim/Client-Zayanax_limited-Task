import React, { useCallback, useState } from "react";
import OrderContext from "../contexts/OrderContext";
import axios from "axios";

const OrderProvider = ({ children }) => {
  const [orderUpdated, setOrderUpdated] = useState(false);
  const [activeState, setActiveState] = useState("all");
  const [orders, setOrders] = useState([]);

  const fetchedOrders = useCallback(async (active) => {
    try {
      const response = await axios.get(
        `https://server-zayanax-limited-task.vercel.app/api/v1/orders?status=${active}`
      );
      if (response.status === 200 && response.data.payload.length > 0) {
        setOrders(response.data.payload);
      }
    } catch (error) {}
  }, []);

  const orderValues = {
    orders,
    setOrders,
    activeState,
    orderUpdated,
    fetchedOrders,
    setActiveState,
    setOrderUpdated,
  };
  return (
    <OrderContext.Provider value={orderValues}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
