import React from "react";
import image from "../../assets/card/iphone-15-pro-max.jfif";

const ProductCard = ({ product }) => {
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
      <div className="w-[220px] max-h-[350px] p-3 rounded-lg overflow-hidden relative group shadow-sm transition-transform duration-300 transform bg-white">
        <img
          className="object-cover object-center rounded-md"
          src={image}
          alt=""
        />
        <div className="py-4">
          <div>iPhone 15 Pro Max</div>
          <div className="pt-9 flex justify-between items-center">
            <p className="text-xl font-semibold">BDT. 7,508</p>
            <div className="bg-[#FFF700] px-2 rounded-sm">
              <p className="font-semibold">15%</p>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="bg-[#FFF700] text-black py-2 px-4 rounded-3xl">
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
