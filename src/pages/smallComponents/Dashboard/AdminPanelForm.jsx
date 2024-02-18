import React from "react";
import { useForm } from "react-hook-form";
import Button from "../../reuseableComponents/Button";
import InputError from "../../reuseableComponents/InputError";

const AdminPanelForm = () => {
  const adminPanelSignInButtonClassNames =
    "py-2 border border-gray-200 px-12 font-semibold rounded-3xl bg-[#FFF700]";

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    reset();
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
      <div className="flex items-center justify-center">
        <Button classNames={adminPanelSignInButtonClassNames} text="Sign in" />
      </div>
    </form>
  );
};

export default AdminPanelForm;
