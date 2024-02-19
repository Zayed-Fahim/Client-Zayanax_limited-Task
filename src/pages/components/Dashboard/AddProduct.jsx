import React from "react";
import AddProductForm from "../../smallComponents/Dashboard/AddProductForm";

const AddProduct = ({ setStatus, setText, setIsSuccess }) => {
  return (
    <div className="flex w-5/6 py-7 h-max justify-center items-center">
      <AddProductForm
        setIsSuccess={setIsSuccess}
        setText={setText}
        setStatus={setStatus}
      />
    </div>
  );
};

export default AddProduct;
