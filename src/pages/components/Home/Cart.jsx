import React from "react";
import CartItem from "../../reuseableComponents/CartItem";
import { useNavigate } from "react-router-dom";
import OrderSummary from "../../smallComponents/Home/OrderSummary";
import TermsAndConditions from "../../smallComponents/Home/TermsAndConditions";

const Cart = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      <div className="flex flex-col gap-5 mx-[2rem] md:mx-[4rem] lg:mx-[6rem] py-5">
        <button
          onClick={() => navigate("/")}
          type="button"
          className="text-xl font-semibold bg-white w-28 drop-shadow py-2 rounded-3xl"
        >
          Go Back
        </button>
        <div className="flex gap-5 w-full">
          <div className="border rounded-xl w-5/6 bg-white flex flex-col h-max">
            <CartItem />
            <TermsAndConditions />
          </div>
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default Cart;
