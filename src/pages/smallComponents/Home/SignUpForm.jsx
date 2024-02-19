import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import InputError from "../../reuseableComponents/InputError";
import Button from "../../reuseableComponents/Button";
import axios from "axios";
import FormSubmissionLoader from "../../reuseableComponents/FormSubmissionLoader";
import AuthContext from "../../../contexts/AuthContext";
import Cookies from "js-cookie";
import CommonContext from "../../../contexts/CommonContext";

const SignUpForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const { setStatus, setText, setIsSuccess } = useContext(CommonContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const signUpButtonClassNames =
    "py-2 border border-gray-200 px-12 font-semibold rounded-3xl bg-[#FFF700]";
  // input validation using zod
  const validation = z.object({
    phone: z.string().refine((value) => /^(?:\+88)?01[1-9]\d{8}$/.test(value), {
      message: "Invalid phone number",
    }),
    password: z.string().min(6),
  });

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({ resolver: zodResolver(validation) });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const newData = {
        ...data,
        role: "user",
      };
      const response = await axios.post(
        "http://localhost:8080/api/v1/user/auth/register",
        newData
      );
      if (response?.status === 200) {
        const token = await response?.data?.payload?.token;
        await setUser(response?.data?.payload?.newUserData);
        Cookies.set("token", token);
        Cookies.set("role", response?.data?.payload?.newUserData?.role);
        reset();
        setIsError(null);
        setIsLoading(false);
        setText("Your Signed up");
        setStatus("Successfully");
        setTimeout(() => setIsSuccess(true), 500);
        setTimeout(() => setIsSuccess(false), 1500);
        setTimeout(() => navigate("/cart"));
      } else {
        setIsError(response?.data?.message);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(error?.response?.data?.message);
    }
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
      {isError && <InputError text={isError} />}
      <div className="flex items-center justify-center">
        <Button
          classNames={signUpButtonClassNames}
          text={isLoading ? <FormSubmissionLoader /> : "Sign UP"}
        />
      </div>
    </form>
  );
};

export default SignUpForm;
