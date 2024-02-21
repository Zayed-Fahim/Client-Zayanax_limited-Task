import React, { useState } from "react";
import CommonContext from "../contexts/CommonContext";

const CommonProvider = ({ children }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [text, setText] = useState(null);
  const [status, setStatus] = useState(null);
  const [buttonText, setButtonText] = useState(null);
  const [cart, setCart] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [items, setItems] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(0);
  const [walletDebit, setWalletDebit] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalPayAble, setTotalPayAble] = useState(total);
  const [discount, setDiscount] = useState(0);

  const values = {
    cart,
    text,
    total,
    items,
    status,
    subTotal,
    discount,
    isSuccess,
    buttonText,
    walletDebit,
    shippingCharge,
    totalPayAble,
    setCart,
    setText,
    setTotal,
    setItems,
    setStatus,
    setSubTotal,
    setDiscount,
    setIsSuccess,
    setButtonText,
    setWalletDebit,
    setShippingCharge,
    setTotalPayAble,
  };
  return (
    <CommonContext.Provider value={values}>{children}</CommonContext.Provider>
  );
};

export default CommonProvider;