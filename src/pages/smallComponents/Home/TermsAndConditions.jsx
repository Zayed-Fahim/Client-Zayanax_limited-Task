import axios from "axios";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import CommonContext from "../../../contexts/CommonContext";
import Button from "../../reuseableComponents/Button";

const TermsAndConditions = ({ total }) => {
  const checkOutButtonClassnames =
    "uppercase px-16 py-2 rounded font-semibold bg-[#FFF700]";
  const {
    cart,
    setText,
    setStatus,
    setIsSuccess,
    setButtonText,
    setCart,
    discount,
    setDiscount,
  } = useContext(CommonContext);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const newAmount = total - discount;
    const newOrder = {
      cart: [...cart],
      terms: data.terms,
      amount: newAmount,
      status: "",
    };
    try {
      const response = await axios.post(
        "https://server-zayanax-limited-task.vercel.app/api/v1/orders",
        newOrder
      );
      if (response.status === 200) {
        reset();
        setCart([]);
        localStorage.removeItem("cart");
        setDiscount(0);
        setText("Your Order Placed");
        setStatus("Successfully");
        setButtonText("Go to Admin Panel");
        setTimeout(() => {
          setIsSuccess(true);
        }, 500);
      }
    } catch (error) {
      setText("Your Order Placed");
      setStatus("Unsuccessful");
      setTimeout(() => setIsSuccess(true), 500);
      setTimeout(() => setIsSuccess(false), 1500);
      console.log(error);
    }
  };

  return (
    <form
      className="py-5 px-5 lg:py-0 lg:px-5 lg:h-20 flex flex-col items-start justify-center relative w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col lg:flex-row justify-between items-center gap-5 lg:font-semibold w-full">
        <div className="flex justify-start items-center gap-3 font-semibold">
          <input
            type="checkbox"
            className={`appearance-none h-5 w-5 rounded-[50%] border-2 cursor-pointer ${
              errors.terms ? "border-red-500" : "border-[#FFF700]"
            }`}
            name="terms"
            id="terms"
            {...register("terms", {
              required: "Please agree to the terms and conditions",
            })}
          />
          <label
            htmlFor="terms"
            className="cursor-pointer text-xs lg:text-[1rem]"
          >
            I agree to the Terms and Conditions, Privacy Policy & Refund Policy
          </label>
        </div>
        {errors.terms && (
          <span className="text-[12px] text-red-500 absolute top-3 left-[52px] opacity-100">
            {errors.terms.message}
          </span>
        )}
        <Button
          type={"submit"}
          classNames={checkOutButtonClassnames}
          text={"Checkout"}
        />
      </div>
    </form>
  );
};

export default TermsAndConditions;
