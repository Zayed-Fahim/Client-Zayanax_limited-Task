import React, { useState } from "react";
import image from "../../assets/card/iphone-15-pro-max.jfif";
import { RiDeleteBinLine } from "react-icons/ri";

const CartItem = () => {
  const [quantity, setQuantity] = useState(1);
  const [isChecked, setIsChecked] = useState(false);

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };
  const handleTermsAndConditions = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div className="flex flex-col">
      <div className="flex justify-start items-center gap-4 p-5 border-b w-full">
        <img height={100} width={100} src={image} alt="" />
        <div className="w-full flex flex-col gap-7">
          <div className="flex items-center justify-between">
            <h1 className="text-[18px] font-semibold">Iphone</h1>
            <RiDeleteBinLine className="hover:text-red-500 hover:scale-110 w-6 h-6 cursor-pointer" />
          </div>
          <div className="flex items-center justify-start gap-28 font-semibold">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-8">
                <p>Color: White</p>
                <p>Size: XL</p>
              </div>
              <p>Product Price: BDT. 2,000</p>
            </div>

            <div className="flex flex-col gap-2">
              <p>Shipping Method: EMS</p>
              <p>Shipping Charge: BDT. 100</p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-center items-center gap-1">
                <p>Quantity:</p>
                <div className="flex items-center">
                  <button
                    className="bg-white border px-3 cursor-pointer rounded-l-3xl"
                    onClick={decreaseQuantity}
                  >
                    -
                  </button>
                  <div className="bg-white border px-3">{quantity}</div>
                  <button
                    className="bg-white border px-3 rounded-r-3xl cursor-pointer"
                    onClick={increaseQuantity}
                  >
                    +
                  </button>
                </div>
              </div>
              <p>Total Price: BDT. 2,100</p>
            </div>
          </div>
        </div>
      </div>
      <div className="pl-10 pr-5 h-20 flex flex-col items-start justify-center relative w-full">
        {!isChecked && (
          <span
            className={`text-[12px] text-red-500 ${
              !isChecked && "absolute top-3 left-20 opacity-100"
            }`}
          >
            Your must agree to the terms and conditions
          </span>
        )}
        <div className="flex justify-between items-center gap-5 font-semibold w-full">
          <div className="flex justify-start items-center gap-5 font-semibold">
            <input
              type="checkbox"
              className={`${
                !isChecked
                  ? "appearance-none h-5 w-5 rounded-[50%] border-2 border-red-500"
                  : "appearance-none h-5 w-5 rounded-[50%] border-2 border-[#FFF700]"
              }`}
              name="terms"
              id="terms"
              checked={isChecked}
              onChange={handleTermsAndConditions}
            />
            <label htmlFor="terms">
              I agree to the Terms and Conditions, Privacy Policy & Refund
              Policy
            </label>
          </div>
          <button
            type="submit"
            disabled={!isChecked}
            className="bg-[#FFF700] uppercase px-16 py-2 rounded font-semibold "
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
