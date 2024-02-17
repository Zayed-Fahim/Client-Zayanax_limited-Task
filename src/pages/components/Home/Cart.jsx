import React from "react";
import CartItem from "../../reuseableComponents/CartItem";
import { useNavigate } from "react-router-dom";
import OrderSummary from "../../smallComponents/Home/OrderSummary";
import TermsAndConditions from "../../smallComponents/Home/TermsAndConditions";
import Button from "../../reuseableComponents/Button";

const Cart = () => {
  const navigate = useNavigate();
  const backButtonClassNames =
    "text-xl font-semibold bg-white w-max drop-shadow px-5 py-2 rounded-3xl";
  return (
    <div className="min-h-screen">
      <div className="flex flex-col gap-5 mx-[2rem] md:mx-[4rem] lg:mx-[6rem] py-5">
        <Button
          onClick={() => navigate("/")}
          type={"button"}
          classNames={backButtonClassNames}
          text={"Go Back"}
        />
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
