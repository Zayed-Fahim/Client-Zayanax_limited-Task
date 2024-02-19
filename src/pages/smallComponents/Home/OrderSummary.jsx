import React, { useContext } from "react";
import { TbCurrencyTaka } from "react-icons/tb";
import AuthContext from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const OrderSummary = () => {
  const { user, admin } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-1/6 bg-white border rounded-xl h-max">
      <div className="py-4 flex justify-center items-center border-b font-semibold">
        <h1>ORDER SUMMARY</h1>
      </div>
      <div className="py-4 px-4 flex flex-col gap-2 border-b border-dashed">
        <div className=" flex justify-between items-center">
          <p>Subtotal (2 Items)</p>
          <div className="flex justify-center items-center">
            <TbCurrencyTaka className="w-5 h-5" /> 4,000
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p>Discount</p>
          <div className="flex justify-center items-center">
            <TbCurrencyTaka className="w-5 h-5" /> 0
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p>Shipping Charge</p>
          <div className="flex justify-center items-center">
            <TbCurrencyTaka className="w-5 h-5" /> 200
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p>Wallet Debit</p>
          <div className="flex justify-center items-center">
            <TbCurrencyTaka className="w-5 h-5" /> 0
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
        <p>Wallet Debit</p>
        <div className="flex justify-center items-center">
          <TbCurrencyTaka className="w-5 h-5" /> 0
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
