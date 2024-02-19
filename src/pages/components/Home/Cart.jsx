import React, { useContext, useEffect } from "react";
import CartItem from "../../reuseableComponents/CartItem";
import { useNavigate } from "react-router-dom";
import OrderSummary from "../../smallComponents/Home/OrderSummary";
import TermsAndConditions from "../../smallComponents/Home/TermsAndConditions";
import Button from "../../reuseableComponents/Button";
import CommonContext from "../../../contexts/CommonContext";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, setCart, setItems } = useContext(CommonContext);
  const backButtonClassNames =
    "text-xl font-semibold bg-white w-max drop-shadow px-5 py-2 rounded-3xl";

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    const parsedCart = storedCart ? JSON.parse(storedCart) : [];
    setCart(parsedCart);
    setItems(cart?.length);
  }, [setCart, cart?.length, setItems]);

  const handleDeleteItem = (itemId) => {
    const updatedCart = cart.filter((item) => item._id !== itemId);
    setCart(updatedCart);
    const updatedCartString = JSON.stringify(updatedCart);
    localStorage.setItem("cart", updatedCartString);
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
              No products found on your cart! Add some products to cart.
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
              <TermsAndConditions />
            </div>
          )}
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default Cart;
