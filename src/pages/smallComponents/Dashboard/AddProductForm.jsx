import React, { useContext, useState } from "react";
import ProductImage from "./ProductImage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputError from "../../reuseableComponents/InputError";
import Button from "../../reuseableComponents/Button";
import StatusButton from "../../reuseableComponents/StatusButton";
import imageUpload from "../../../utils/imageUpload";
import axios from "axios";
import FormSubmissionLoader from "../../reuseableComponents/FormSubmissionLoader";
import CommonContext from "../../../contexts/CommonContext";

const AddProductForm = () => {
  const { setStatus, setText, setIsSuccess } = useContext(CommonContext);
  const [isChecked, setIsChecked] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [processedImage, setProcessedImage] = useState(null);
  const [imageError, setImageError] = useState(null);
  const addProductButtonClassNames =
    "py-2 border border-gray-200 px-6 font-bold rounded-3xl bg-[#FFF700]";

  const validation = z.object({
    productName: z
      .string()
      .min(1)
      .regex(/^[a-zA-Z0-9\s]*$/),
    productPriceBeforeDiscount: z.string().min(1).regex(/^\d+$/),
    discountRate: z.string().regex(/^(\d+)?(\.\d{1,3})?$/),
    shippingCharge: z
      .string()
      .min(1)
      .regex(/^(\d+)?(\.\d{1,3})?$/),
    color: z
      .string()
      .min(3)
      .regex(/^[A-Z][a-z]*$/),
    size: z.string().regex(/^[a-zA-Z0-9\s]*$/),
  });

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({ resolver: zodResolver(validation) });

  const onSubmit = async (data) => {
    if (!processedImage) {
      setImageError("Please select an image");
      return;
    } else if (processedImage) {
      setImageError(null);
    }
    setIsLoading(true);
    try {
      const productImage = await imageUpload(processedImage);
      const productData = {
        ...data,
        status: isChecked,
        productImage,
        usageCount: 0,
      };
      const response = await axios.post(
        "http://localhost:8080/api/v1/products",
        productData
      );
      if (response.status === 200) {
        setProcessedImage(null);
        setImageError(null);
        reset();
        setIsChecked(true);
        setIsLoading(false);
        setText("Your Product Added");
        setStatus("Successfully");
        setTimeout(() => setIsSuccess(true), 500);
        setTimeout(() => setIsSuccess(false), 2000);
      }
    } catch (error) {
      console.error("Error submitting data:", error.message);
      setIsLoading(false);
    }
  };

  return (
    <form
      className="bg-white md:w-2/4 lg:w-1/5 drop-shadow-md p-8 rounded-2xl flex gap-5 flex-col"
      onSubmit={handleSubmit(onSubmit)}
    >
      <ProductImage
        processedImage={processedImage}
        setProcessedImage={setProcessedImage}
        setImageError={setImageError}
      />
      {imageError && !processedImage && <InputError text={imageError} />}
      <div className="flex gap-3 flex-col">
        <div>
          <label htmlFor="productName" className="font-semibold pb-2">
            Product Name
          </label>
          <input
            className="appearance-none border pl-4 border-gray-300 rounded-md w-full py-2 text-gray-600 leading-tight focus:outline-none mt-2"
            id="productName"
            type="text"
            {...register("productName", {
              required: true,
            })}
          />
        </div>
        {errors?.productName && <InputError text="Product Name is required!" />}

        <div>
          <label
            htmlFor="productPriceBeforeDiscount"
            className="font-semibold pb-2"
          >
            Product Price (BeforeDiscount)
          </label>
          <input
            className="appearance-none border pl-4 border-gray-200 rounded-md w-full py-2 text-gray-600 leading-tight focus:outline-none mt-2"
            id="productPriceBeforeDiscount"
            type="text"
            {...register("productPriceBeforeDiscount", { required: true })}
          />
        </div>
        {errors.productPriceBeforeDiscount && (
          <InputError text="Price is required! Must be number" />
        )}

        <div>
          <label htmlFor="discountRate" className="font-semibold pb-2">
            Discount Rate
          </label>
          <input
            className="appearance-none border pl-4 border-gray-200 rounded-md w-full py-2 text-gray-600 leading-tight focus:outline-none mt-2"
            id="discountRate"
            type="text"
            {...register("discountRate")}
          />
        </div>
        {errors.discountRate && (
          <InputError text="Discount rate is not valid!" />
        )}

        <div>
          <label htmlFor="shippingCharge" className="font-semibold pb-2">
            Shipping Charge
          </label>
          <input
            className="appearance-none border pl-4 border-gray-200 rounded-md w-full py-2 text-gray-600 leading-tight focus:outline-none mt-2"
            id="shippingCharge"
            type="text"
            {...register("shippingCharge", { required: true })}
          />
        </div>
        {errors.shippingCharge && (
          <InputError text="Shipping charge is required! Shipping charge is not valid!" />
        )}

        <div>
          <label htmlFor="color" className="font-semibold pb-2">
            Color
          </label>
          <input
            className="appearance-none border pl-4 border-gray-200 rounded-md w-full py-2 text-gray-600 leading-tight focus:outline-none mt-2"
            id="color"
            type="text"
            {...register("color", { required: true })}
          />
        </div>
        {errors.color && (
          <InputError text="Color is not valid! First Character must be uppercase." />
        )}

        <div>
          <label htmlFor="size" className="font-semibold pb-2">
            Size
          </label>
          <input
            className="appearance-none uppercase border pl-4 border-gray-200 rounded-md w-full py-2 text-gray-600 leading-tight focus:outline-none mt-2"
            id="size"
            type="text"
            {...register("size", { required: true })}
          />
        </div>
        {errors.size && <InputError text="Size is not valid!" />}

        <StatusButton
          isChecked={isChecked}
          setIsChecked={setIsChecked}
          firstText="Yes"
          secondText="No"
        />
      </div>
      <div className="flex items-center justify-center">
        <Button
          classNames={addProductButtonClassNames}
          text={isLoading ? <FormSubmissionLoader /> : "Add Product"}
        />
      </div>
    </form>
  );
};

export default AddProductForm;
