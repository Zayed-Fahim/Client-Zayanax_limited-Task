import React from "react";
import ProductImage from "./ProductImage";

const AddProductForm = () => {
  return (
    <form className="bg-white w-[20%] h-screen drop-shadow-md p-8 rounded-2xl">
      <ProductImage />
    </form>
  );
};

export default AddProductForm;
