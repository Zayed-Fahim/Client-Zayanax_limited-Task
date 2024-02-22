import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CommonContext from "../../contexts/CommonContext";
import Button from "./Button";
import FormSubmissionLoader from "./FormSubmissionLoader";
import InputError from "./InputError";
import StatusButton from "./StatusButton";

const EditablePromoCode = () => {
  const navigate = useNavigate();
  const {
    setText,
    setStatus,
    setPromoCode,
    setIsSuccess,
    promoCodeData,
    isPromoCodeEditing,
    setIsPromoCodeEditing
  } = useContext(CommonContext);
  const [isChecked, setIsChecked] = useState(promoCodeData?.status || false);
  const [isLoading, setIsLoading] = useState(false);
  const addPromoCodeButtonClassNames =
    "py-2.5 shadow px-10 font-bold rounded-3xl bg-[#FFF700]";

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: promoCodeData,
  });

  useEffect(() => {
    if (!promoCodeData) {
      navigate("/dashboard/promotion/promo-codes");
    }
  }, [promoCodeData, navigate]);

  const updatePromoCode = async (data) => {
    try {
      const updatedPromoCodeData = {
        ...data,
        status: isChecked,
      };
      console.log(typeof isChecked);
      const response = await axios.patch(
        `https://server-zayanax-limited-task.vercel.app/api/v1/promo-code/${promoCodeData?._id}`,
        updatedPromoCodeData
      );
      handleUpdateSubmissionResponse(response);
    } catch (error) {
      setIsLoading(false);
    }
  };
  const handleUpdateSubmissionResponse = (response) => {
    if (response.status === 200) {
      setIsLoading(false);
      reset();
      setText("Your Promo Code Updated");
      setStatus("Successfully");
      setTimeout(() => setIsSuccess(true), 500);
      setTimeout(() => {
        setIsSuccess(false);
        navigate("/dashboard/promotion/promo-codes");
      }, 2000);
      setPromoCode(null);
      setIsPromoCodeEditing(false);
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    await updatePromoCode(data);
  };

  return (
    <div className="flex w-5/6 py-7 h-max justify-center items-center">
      <form
        className="bg-white w-[20%] drop-shadow-md p-8 rounded-2xl flex gap-5 flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex gap-4 flex-col">
          <div>
            <label htmlFor="promoCode" className="font-semibold pb-2">
              Promo Code
            </label>
            <input
              className="appearance-none border pl-4 border-gray-300 rounded-md w-full py-2.5 text-gray-600 leading-tight focus:outline-none mt-2 uppercase"
              id="promoCode"
              readOnly={isPromoCodeEditing}
              type="text"
              {...register("promoCode", {
                required: true,
              })}
            />
          </div>
          {errors?.promoCode && (
            <InputError
              text={
                errors?.promoCode
                  ? errors.promoCode.message
                  : "Promo Code is required!"
              }
            />
          )}

          <div>
            <label htmlFor="startDate" className="font-semibold pb-2">
              Start Date
            </label>
            <input
              className="appearance-none border pl-4 pr-2 border-gray-200 rounded-md w-full py-2.5 text-gray-600 leading-tight focus:outline-none mt-2"
              id="startDate"
              readOnly={isPromoCodeEditing}
              type="date"
              {...register("startDate", { required: true })}
            />
          </div>
          {errors?.startDate && <InputError text={errors?.startDate.message} />}

          <div>
            <label htmlFor="endDate" className="font-semibold pb-2">
              End Date
            </label>
            <input
              className="appearance-none border pl-4 pr-2 border-gray-200 rounded-md w-full py-2.5 text-gray-600 leading-tight focus:outline-none mt-2"
              id="endDate"
              type="date"
              {...register("endDate", { required: true })}
            />
          </div>
          {errors?.endDate && <InputError text={"End date is required!"} />}

          <div>
            <label htmlFor="discountRate" className="font-semibold pb-2">
              Discount Rate
            </label>
            <input
              className="appearance-none border pl-4 border-gray-200 rounded-md w-full py-2.5 text-gray-600 leading-tight focus:outline-none mt-2"
              id="discountRate"
              {...register("discountRate", {
                required: true,
                pattern: /^[0-9]+(\.[0-9]+)?$/,
              })}
            />
          </div>
          {errors?.discountRate && (
            <InputError text={"Enter valid discount rate!"} />
          )}

          <div>
            <label htmlFor="useTime" className="font-semibold pb-2">
              Use Time
            </label>
            <input
              className="appearance-none border pl-4 border-gray-200 rounded-md w-full py-2.5 text-gray-600 leading-tight focus:outline-none mt-2"
              id="useTime"
              {...register("useTime", { required: true, pattern: /^\d+$/ })}
            />
          </div>
          {errors?.useTime && <InputError text={"Enter valid use time!"} />}

          <StatusButton
            isChecked={isChecked}
            setIsChecked={setIsChecked}
            firstText="Yes"
            secondText="No"
          />
        </div>
        <div className="flex items-center justify-center">
          <Button
            classNames={addPromoCodeButtonClassNames}
            text={isLoading ? <FormSubmissionLoader /> : "Update"}
          />
        </div>
      </form>
    </div>
  );
};

export default EditablePromoCode;
