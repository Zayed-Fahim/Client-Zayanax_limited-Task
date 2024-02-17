import React from "react";
import { useForm } from "react-hook-form";

const TermsAndConditions = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    if (data.terms) {
      reset();
    } else {
      alert("Please agree to the terms and conditions");
    }
  };
  return (
    <form
      className="px-5 h-20 flex flex-col items-start justify-center relative w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex justify-between items-center gap-5 font-semibold w-full">
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
          <label htmlFor="terms" className="cursor-pointer">
            I agree to the Terms and Conditions, Privacy Policy & Refund Policy
          </label>
        </div>
        {errors.terms && (
          <span className="text-[12px] text-red-500 absolute top-3 left-[52px] opacity-100">
            {errors.terms.message}
          </span>
        )}
        <button
          type="submit"
          className="uppercase px-16 py-2 rounded font-semibold bg-[#FFF700]"
        >
          Checkout
        </button>
      </div>
    </form>
  );
};

export default TermsAndConditions;
