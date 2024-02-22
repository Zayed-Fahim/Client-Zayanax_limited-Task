import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CommonContext from "../../../contexts/CommonContext";
import Button from "../../reuseableComponents/Button";
import FormSubmissionLoader from "../../reuseableComponents/FormSubmissionLoader";
import InputError from "../../reuseableComponents/InputError";
import StatusButton from "../../reuseableComponents/StatusButton";
import PromoCodeContext from "../../../contexts/PromoCodeContext";

const AddPromoCodeForm = () => {
  const { setText, setStatus, setIsSuccess, isPromoCodeEditing } =
    useContext(CommonContext);
  const { fetchedPromoCodes } = useContext(PromoCodeContext);
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const addPromoCodeButtonClassNames =
    "py-2.5 shadow px-10 font-bold rounded-3xl bg-[#FFF700]";

  const validation = z.object({
    promoCode: z
      .string()
      .min(4, {
        message: "Please enter a valid code! Minimum length is 4.",
      })
      .regex(/^[A-Za-z0-9]*$/),
    startDate: z
      .string()
      .refine((value) => !!value, { message: "Start Date is required!" }),
    endDate: z
      .string()
      .refine((value) => !!value, { message: "End Date is required!" }),
    discountRate: z
      .string()
      .min(1, {
        message: "Enter valid discount rate!",
      })
      .regex(/^(\d+)?(\.\d{1,3})?$/),
    useTime: z
      .string()
      .min(1, { message: "Enter valid use time!" })
      .regex(/^[0-9]*$/),
  });

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validation),
  });

  const submitPromoCode = async (data) => {
    try {
      const postPromoCodeData = {
        ...data,
        status: isChecked,
      };

      const response = await axios.post(
        "https://server-zayanax-limited-task.vercel.app/api/v1/promo-code",
        postPromoCodeData
      );

      handlePostSubmissionResponse(response);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handlePostSubmissionResponse = async (response) => {
    if (response.status === 200) {
      await fetchedPromoCodes();
      reset();
      setText("Your Promo Code Added");
      setStatus("Successfully");
      setTimeout(() => setIsSuccess(true), 500);
      setTimeout(() => setIsSuccess(false), 2000);
      setIsLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    await submitPromoCode(data);
  };

  return (
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
        {errors?.endDate && <InputError text={errors?.endDate.message} />}

        <div>
          <label htmlFor="discountRate" className="font-semibold pb-2">
            Discount Rate
          </label>
          <input
            className="appearance-none border pl-4 border-gray-200 rounded-md w-full py-2.5 text-gray-600 leading-tight focus:outline-none mt-2"
            id="discountRate"
            type="text"
            {...register("discountRate", { required: true })}
          />
        </div>
        {errors?.discountRate && (
          <InputError text={errors.discountRate.message} />
        )}

        <div>
          <label htmlFor="useTime" className="font-semibold pb-2">
            Use Time
          </label>
          <input
            className="appearance-none border pl-4 border-gray-200 rounded-md w-full py-2.5 text-gray-600 leading-tight focus:outline-none mt-2"
            id="useTime"
            type="text"
            {...register("useTime", { required: true })}
          />
        </div>
        {errors?.useTime && <InputError text={errors.useTime.message} />}

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
          text={isLoading ? <FormSubmissionLoader /> : "Add"}
        />
      </div>
    </form>
  );
};

export default AddPromoCodeForm;
