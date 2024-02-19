import React from "react";
import Button from "./Button";

const ProductCard = ({ product }) => {
  const addToCartButtonClassNames =
    "bg-[#FFF700] text-black py-2 px-4 rounded-3xl";

  const discountedPrice =
    product?.productPriceBeforeDiscount -
    product?.productPriceBeforeDiscount * (product?.discountRate / 100);
  return (
    <>
      <style jsx="true">{`
        .group:hover .opacity-0 {
          opacity: 1;
          background-color: white;
          transition-delay: 0.3s;
          transition: opacity 0.3s ease-in-out;
        }
      `}</style>
      <div className="w-[220px] h-[340px] p-3 rounded-lg overflow-hidden relative group shadow-sm transition-transform duration-300 transform bg-white">
        <img
          loading="lazy"
          className="rounded-md border-black h-[200px] w-full object-contain object-center"
          src={product?.productImage}
          alt={product?.productName}
        />
        <div className="py-4">
          <div className="font-semibold">{product?.productName}</div>
          <div className="pt-9 flex justify-between items-center">
            <p className="text-xl font-semibold">BDT. {discountedPrice}</p>
            <div className="bg-[#FFF700] px-2 rounded-sm">
              <p className="font-semibold">{product?.discountRate}%</p>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            classNames={addToCartButtonClassNames}
            text="Add to Cart"
            type="button"
          />
        </div>
      </div>
    </>
  );
};

export default ProductCard;
