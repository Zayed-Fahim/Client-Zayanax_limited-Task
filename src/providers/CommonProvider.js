import React, { useState } from "react";
import CommonContext from "../contexts/CommonContext";

const CommonProvider = ({ children }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [text, setText] = useState(null);
  const [status, setStatus] = useState(null);
  const [buttonText, setButtonText] = useState(null);
  const [onClick, setOnClick] = useState(null);
  const [cart, setCart] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [items, setItems] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(0);
  const [walletDebit, setWalletDebit] = useState(0);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);

  const values = {
    cart,
    text,
    total,
    items,
    status,
    onClick,
    subTotal,
    discount,
    isSuccess,
    buttonText,
    walletDebit,
    shippingCharge,
    setCart,
    setText,
    setTotal,
    setItems,
    setStatus,
    setOnClick,
    setSubTotal,
    setDiscount,
    setIsSuccess,
    setButtonText,
    setWalletDebit,
    setShippingCharge,
  };
  return (
    <CommonContext.Provider value={values}>{children}</CommonContext.Provider>
  );
};

export default CommonProvider;
