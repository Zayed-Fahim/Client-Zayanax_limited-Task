import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
import { z } from "zod";
import InputError from "../../reuseableComponents/InputError";

const SignUpForm = () => {
  //   const navigate = useNavigate();
  // input validation using zod
  const validation = z.object({
    phone: z.string().refine((value) => /^(?:\+88)?01[1-9]\d{8}$/.test(value), {
      message: "Invalid phone number",
    }),
    password: z.string().min(6),
  });

  // use react hook form for getting input value from registration form
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({ resolver: zodResolver(validation) });
  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-5 flex-col">
        <div>
          <label htmlFor="phoneNumber" className="font-semibold pb-2">
            Phone Number
          </label>
          <input
            className="appearance-none border pl-4 border-gray-200 rounded-md w-full py-2.5 text-gray-600 leading-tight focus:outline-none mt-2"
            id="phoneNumber"
            type="text"
            {...register("phone", {
              required: true,
            })}
          />
        </div>
        {errors.phone && <InputError text={errors.phone.message} />}
        <div>
          <label htmlFor="password" className="font-semibold pb-2">
            Password
          </label>
          <input
            className="appearance-none border pl-4 border-gray-200 rounded-md w-full py-2.5 text-gray-600 leading-tight focus:outline-none mt-2"
            id="password"
            type="password"
            {...register("password", { required: true })}
          />
        </div>
        {errors.password && (
          <InputError text="Password is required! Length must be at least 6 characters." />
        )}
      </div>
      <div className="flex items-center justify-center">
        <button className="py-2 border border-gray-200 px-12 font-semibold rounded-3xl bg-[#FFF700]">
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
