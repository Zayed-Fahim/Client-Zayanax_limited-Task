import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CommonContext from "../../contexts/CommonContext";
import ProductImage from "../smallComponents/Dashboard/ProductImage";
import Button from "./Button";
import FormSubmissionLoader from "./FormSubmissionLoader";
import InputError from "./InputError";
import StatusButton from "./StatusButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditableProductCardForm = () => {
  const navigate = useNavigate();
  const {
    setStatus,
    setText,
    setIsSuccess,
    productData,
    setProduct,
    setIsProductEditing,
  } = useContext(CommonContext);
  const [isChecked, setIsChecked] = useState(productData?.status || false);
  const [isLoading, setIsLoading] = useState(false);
  const addProductButtonClassNames =
    "py-2 border border-gray-200 px-6 font-bold rounded-3xl bg-[#FFF700]";

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: productData,
  });
  useEffect(() => {
    if (!productData) {
      navigate("/dashboard/products");
    }
  }, [productData, navigate]);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const updatedProductData = {
        ...data,
        status: isChecked,
      };
      const response = await axios.patch(
        `https://server-zayanax-limited-task.vercel.app/api/v1/products/${productData?._id}`,
        updatedProductData
      );
      if (response.status === 200) {
        reset();
        setIsChecked(true);
        setIsLoading(false);
        setText("Your Product Updated");
        setStatus("Successfully");
        setTimeout(() => setIsSuccess(true), 500);
        setTimeout(() => {
          setIsSuccess(false);
          navigate("/dashboard/products");
        }, 2000);
        setProduct(null);
        setIsProductEditing(false);
      }
    } catch (error) {
      console.error("Error submitting data:", error.message);
      setIsLoading(false);
    }
  };
  return (
    <div className="flex w-5/6 py-7 h-max justify-center items-center">
      <form
        className="bg-white md:w-2/4 lg:w-1/5 drop-shadow-md p-8 rounded-2xl flex gap-5 flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <ProductImage productData={productData} />

        <div className="flex gap-3 flex-col">
          <div>
            <label htmlFor="productName" className="font-semibold pb-2">
              Product Name
            </label>
            <input
              className="appearance-none border pl-4 border-gray-300 rounded-md w-full py-2 text-gray-600 leading-tight focus:outline-none mt-2"
              {...register("productName", {
                required: true,
                pattern: /^[a-zA-Z0-9\s]*$/,
              })}
            />
          </div>
          {errors?.productName && (
            <InputError text="Product Name is required!" />
          )}

          <div>
            <label
              htmlFor="productPriceBeforeDiscount"
              className="font-semibold pb-2"
            >
              Product Price (BeforeDiscount)
            </label>
            <input
              className="appearance-none border pl-4 border-gray-200 rounded-md w-full py-2 text-gray-600 leading-tight focus:outline-none mt-2"
              {...register("productPriceBeforeDiscount", {
                required: true,
                pattern: /^\d+(\.\d{1,3})?$/,
              })}
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
              {...register("discountRate", {
                pattern: /^\d+$/,
              })}
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
              {...register("shippingCharge", {
                required: true,
                pattern: /^\d+(\.\d{1,3})?$/,
              })}
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
              {...register("color", {
                required: true,
                pattern: /^[A-Z][a-z]*$/,
              })}
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
              {...register("size", {
                pattern: /^[a-zA-Z0-9\s]*$/,
              })}
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
            text={isLoading ? <FormSubmissionLoader /> : "Update Product"}
          />
        </div>
      </form>
    </div>
  );
};

export default EditableProductCardForm;
