import React, { useContext, useEffect, useState } from "react";
import { TbCurrencyTaka } from "react-icons/tb";
import AuthContext from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import CommonContext from "../../../contexts/CommonContext";
import axios from "axios";
import Button from "../../reuseableComponents/Button";
import FormSubmissionLoader from "../../reuseableComponents/FormSubmissionLoader";

const OrderSummary = () => {
  const navigate = useNavigate();
  const { user, admin } = useContext(AuthContext);
  const [promoCode, setPromoCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [promoCodeError, setPromoCodeError] = useState("");
  const [promoCodeSuccess, setPromoCodeSuccess] = useState("");
  const {
    subTotal,
    items,
    shippingCharge,
    walletDebit,
    total,
    discount,
    setDiscount,
    setTotal,
  } = useContext(CommonContext);

  useEffect(() => {
    setTotal(subTotal + shippingCharge);
  }, [setTotal, shippingCharge, subTotal]);

  const handlePromoCode = (event) => {
    setPromoCode(event.target.value);
  };

  const handlePromoCodeDiscount = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `https://server-zayanax-limited-task.vercel.app/api/v1/promo-code/apply-promo-code`,
        { promoCode: promoCode }
      );
      if (response.status === 200) {
        const calculatedDiscount = parseInt(
          (subTotal * response?.data?.payload?.discountRate) / 100
        );
        await setDiscount(calculatedDiscount);
        setPromoCodeSuccess("Promo Code Applied!");
        setPromoCode("");
        setIsLoading(false);
        setTimeout(() => setPromoCodeSuccess(""), 5000);
      }
    } catch (error) {
      setIsLoading(false);
      setPromoCodeError(error.response.data.message);
      setTimeout(() => setPromoCodeError(""), 5000);
      console.log(error);
    }
  };
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
          value={promoCode}
          onChange={handlePromoCode}
          disabled={!user && !admin}
          className="focus:outline-none border rounded-l h-10 pl-3 text-sm w-full uppercase"
        />
        <div
          className="px-5 h-10 rounded-r border-t border-r border-b bg-[#FBFBFB]"
          onClick={() => {
            if (!user) {
              navigate("/auth/sign-up");
            } else if (user || admin) {
              handlePromoCodeDiscount();
            }
          }}
        >
          <Button
            classNames="w-auto h-full"
            text={isLoading ? <FormSubmissionLoader /> : "Apply"}
          />
        </div>
      </div>
      {promoCodeError && (
        <p className="text-red-500 px-5 font-semibold w-full text-center">
          {promoCodeError}
        </p>
      )}
      {promoCodeSuccess && (
        <p className="text-green-500 px-5 font-semibold w-full text-center">
          {promoCodeSuccess}
        </p>
      )}
      <div className="py-4 px-4 flex justify-between items-center">
        <p>Total Payable</p>
        <div className="flex justify-center items-center">
          <TbCurrencyTaka className="w-5 h-5" />{" "}
          {discount ? total - discount : total}
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
