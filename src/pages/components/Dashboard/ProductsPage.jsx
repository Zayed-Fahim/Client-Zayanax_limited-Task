import React from "react";
import Button from "../../reuseableComponents/Button";
import ProductCard from "../../reuseableComponents/ProductCard";
import { useNavigate } from "react-router-dom";

const ProductsPage = () => {
  const navigate = useNavigate();
  const addProductClassNames =
    "font-semibold bg-white w-max px-7 drop-shadow py-2 rounded-3xl";
  return (
    <div className="flex flex-col gap-5 px-10 py-5">
      <Button
        onClick={() => navigate("/dashboard/products/add-new-products")}
        type={"button"}
        classNames={addProductClassNames}
        text={"Add New Product"}
      />
      <ProductCard />
    </div>
  );
};

export default ProductsPage;
