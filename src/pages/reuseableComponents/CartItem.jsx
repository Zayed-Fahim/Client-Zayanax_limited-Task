import React, { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";

const CartItem = ({ item, handleDeleteItem }) => {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };
  const discountedPrice =
    item?.productPriceBeforeDiscount -
    item?.productPriceBeforeDiscount * (item?.discountRate / 100);

  const handleDelete = () => {
    handleDeleteItem(item._id);
  };
  return (
    <div className="flex justify-start items-center gap-4 p-5 border-b w-full">
      <img height={100} width={100} src={item?.productImage} alt="" />
      <div className="w-full flex flex-col gap-7">
        <div className="flex items-center justify-between">
          <h1 className="text-[18px] font-semibold">{item?.productName}</h1>
          <RiDeleteBinLine
            className="hover:text-red-500 hover:scale-110 w-6 h-6 cursor-pointer"
            onClick={handleDelete}
          />
        </div>
        <div className="flex items-center justify-start gap-28 font-semibold">
          <div className="flex flex-col gap-2 w-1/5">
            <div className="flex items-center gap-8">
              <p>Color: {item?.color}</p>
              <p>Size: {item?.size}</p>
            </div>
            <p>Product Price: BDT. {discountedPrice * quantity}</p>
          </div>

          <div className="flex flex-col gap-2 w-1/5">
            <p>Shipping Method: EMS</p>
            <p>Shipping Charge: BDT. {item?.shippingCharge * quantity}</p>
          </div>

          <div className="flex flex-col gap-2 w-1/5">
            <div className="flex justify-start items-center gap-1">
              <p>Quantity:</p>
              <div className="flex">
                <button
                  className="bg-white border px-3 cursor-pointer rounded-l-3xl"
                  onClick={decreaseQuantity}
                >
                  -
                </button>
                <div className="bg-white border px-3">{quantity}</div>
                <button
                  className="bg-white border px-3 rounded-r-3xl cursor-pointer"
                  onClick={increaseQuantity}
                >
                  +
                </button>
              </div>
            </div>
            <p>
              Total Price: BDT.{" "}
              {discountedPrice * quantity + item.shippingCharge * quantity}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
