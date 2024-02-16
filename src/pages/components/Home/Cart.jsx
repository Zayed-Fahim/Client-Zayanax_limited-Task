import React from "react";
import CartItem from "../../reuseableComponents/CartItem";
import { useNavigate } from "react-router-dom";

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
        <div className="border w-4/5 rounded-xl bg-white">
          <CartItem />
        </div>
      </div>
    </div>
  );
};

export default Cart;
