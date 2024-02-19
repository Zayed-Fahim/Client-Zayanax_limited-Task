import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../reuseableComponents/Button";
import InputError from "../../reuseableComponents/InputError";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../contexts/AuthContext";
import Cookies from "js-cookie";
import axios from "axios";
import FormSubmissionLoader from "../../reuseableComponents/FormSubmissionLoader";
import CommonContext from "../../../contexts/CommonContext";

const AdminPanelForm = () => {
  const { setStatus, setText, setIsSuccess } = useContext(CommonContext);
  const navigate = useNavigate();
  const { setAdmin } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const adminPanelSignInButtonClassNames =
    "py-2 border border-gray-200 px-12 font-semibold rounded-3xl bg-[#FFF700]";

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const newData = {
        userId: data.userId,
        password: data.password,
      };
      const response = await axios.post(
        "http://localhost:8080/api/v1/admin/auth/login",
        newData
      );
      if (response?.status === 200) {
        const token = await response?.data?.payload?.token;
        await setAdmin(response?.data?.payload?.newAdminData);
        Cookies.set("token", token);
        Cookies.set("role", response?.data?.payload?.newAdminData?.role);
        reset();
        setIsError(null);
        setIsLoading(false);
        setText("Your Signed in");
        setStatus("Successfully");
        setTimeout(() => setIsSuccess(true), 500);
        setTimeout(() => setIsSuccess(false), 1500);
        setTimeout(() => navigate("/dashboard"));
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
            User ID
          </label>
          <input
            className="appearance-none border pl-4 border-gray-200 rounded-md w-full py-2.5 text-gray-600 leading-tight focus:outline-none mt-2"
            id="userId"
            type="text"
            {...register("userId", {
              required: true,
            })}
          />
        </div>
        {errors?.userId && <InputError text="User ID is required!" />}
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
        {errors?.password && <InputError text="Password is required!" />}
      </div>
      {isError && <InputError text={isError} />}
      <div className="flex items-center justify-center">
        <Button
          classNames={adminPanelSignInButtonClassNames}
          text={isLoading ? <FormSubmissionLoader /> : "Sign in"}
        />
      </div>
    </form>
  );
};

export default AdminPanelForm;
