import React, { useContext } from "react";
import { TbCurrencyTaka } from "react-icons/tb";
import AuthContext from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import CommonContext from "../../../contexts/CommonContext";

const OrderSummary = () => {
  const navigate = useNavigate();
  const { user, admin } = useContext(AuthContext);
  const { subTotal, items, shippingCharge, walletDebit, total, discount } =
    useContext(CommonContext);

  return (
    <div className="flex flex-col w-1/6 bg-white border rounded-xl h-max sticky top-[85px]">
      <div className="py-4 flex justify-center items-center border-b font-semibold">
        <h1>ORDER SUMMARY</h1>
      </div>
      <div className="py-4 px-4 flex flex-col gap-2 border-b border-dashed">
        <div className=" flex justify-between items-center">
          <p>Subtotal ({items} Items)</p>
          <div className="flex justify-center items-center">
            <TbCurrencyTaka className="w-5 h-5" /> {subTotal}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p>Discount</p>
          <div className="flex justify-center items-center">
            <TbCurrencyTaka className="w-5 h-5" /> {discount}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p>Shipping Charge</p>
          <div className="flex justify-center items-center">
            <TbCurrencyTaka className="w-5 h-5" /> {shippingCharge}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p>Wallet Debit</p>
          <div className="flex justify-center items-center">
            <TbCurrencyTaka className="w-5 h-5" /> {walletDebit}
          </div>
        </div>
      </div>
      <div className="py-4 px-4 w-full flex justify-center items-center border-b border-dashed">
        <input
          type="text"
          disabled={!user && !admin}
          className="focus:outline-none border rounded-l h-10 pl-3 text-sm w-full"
        />
        <button
          className="px-5 h-10 rounded-r border-t border-r border-b bg-[#FBFBFB]"
          onClick={() => {
            if (!user) {
              navigate("/auth/sign-up");
            }
          }}
        >
          Apply
        </button>
      </div>
      <div className="py-4 px-4 flex justify-between items-center">
        <p>Total</p>
        <div className="flex justify-center items-center">
          <TbCurrencyTaka className="w-5 h-5" /> {total}
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
