import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CommonContext from "../../../contexts/CommonContext";
import Button from "../../reuseableComponents/Button";
import CartItem from "../../reuseableComponents/CartItem";
import OrderSummary from "../../smallComponents/Home/OrderSummary";
import TermsAndConditions from "../../smallComponents/Home/TermsAndConditions";

const Cart = () => {
  const navigate = useNavigate();
  const backButtonClassNames =
    "text-xl font-semibold bg-white w-max drop-shadow px-5 py-2 rounded-3xl";
  const {
    cart,
    total,
    setCart,
    setItems,
    subTotal,
    setSubTotal,
    shippingCharge,
    setShippingCharge,
  } = useContext(CommonContext);

  useEffect(() => {
    const storedCart = localStorage?.getItem("cart");
    const parsedCart = storedCart ? JSON.parse(storedCart) : [];
    setCart(parsedCart);
    setItems(parsedCart?.length);
    const updatedSubTotal = calculateSubTotal(parsedCart);
    setSubTotal(updatedSubTotal);
    const updatedShippingCharge = calculateShippingTotalCharge(parsedCart);
    setShippingCharge(updatedShippingCharge);
  }, [
    setCart,
    setItems,
    setSubTotal,
    setShippingCharge,
    shippingCharge,
    subTotal,
  ]);

  const handleDeleteItem = (itemId) => {
    const updatedCart = cart.filter((item) => item?._id !== itemId);
    setCart(updatedCart);
    setItems(updatedCart?.length);
    const updatedSubTotal = calculateSubTotal(updatedCart);
    setSubTotal(updatedSubTotal);
    const updatedShippingCharge = calculateShippingTotalCharge(updatedCart);
    setShippingCharge(updatedShippingCharge);
    const updatedCartString = JSON.stringify(updatedCart);
    localStorage.setItem("cart", updatedCartString);
  };

  const calculateSubTotal = (cartItems) => {
    return cartItems.reduce((acc, item) => {
      const discountedPrice =
        item?.productPriceBeforeDiscount * (1 - item?.discountRate / 100);
      return acc + discountedPrice * item.quantity;
    }, 0);
  };
  const calculateShippingTotalCharge = (cartItems) => {
    return cartItems.reduce((acc, item) => {
      const shippingTotal = item?.shippingCharge * item?.quantity;
      return acc + shippingTotal;
    }, 0);
  };

  return (
    <div className="h-[calc(100vh-73px)] overflow-y-auto">
      <div className="flex flex-col gap-5 mx-[2rem] md:mx-[4rem] lg:mx-[6rem] py-5">
        <Button
          onClick={() => navigate("/")}
          type={"button"}
          classNames={backButtonClassNames}
          text={"Go Back"}
        />
        <div className="flex gap-5 w-full ">
          {cart.length <= 0 ? (
            <p className="h-max py-10 w-5/6 font-semibold rounded-xl border bg-white flex justify-center items-center">
              No products found in your cart! Add some products to the cart.
            </p>
          ) : (
            <div className="border rounded-xl w-5/6 bg-white flex flex-col h-max">
              {cart?.length > 0 &&
                cart?.map((item, index) => (
                  <CartItem
                    item={item}
                    key={index}
                    handleDeleteItem={handleDeleteItem}
                  />
                ))}
              <TermsAndConditions total={total} />
            </div>
          )}
          <OrderSummary
            subTotal={calculateSubTotal(cart)}
            shippingCharge={calculateShippingTotalCharge(cart)}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
