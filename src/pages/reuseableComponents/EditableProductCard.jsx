import React, { useContext } from "react";
import CommonContext from "../../contexts/CommonContext";
import { useNavigate } from "react-router-dom";

const EditableProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { setIsProductEditing, setProduct } = useContext(CommonContext);
  const discountedPrice =
    product?.productPriceBeforeDiscount -
    product?.productPriceBeforeDiscount * (product?.discountRate / 100);

  const handleEditProduct = () => {
    const action = window.confirm("Do you want to edit this product?");
    if (action) {
      setProduct(product);
      setIsProductEditing(true);
      navigate("/dashboard/products/add-new-product/mode=editing");
    } else {
      setProduct(null);
      setIsProductEditing(true);
    }
  };
  return (
    <div
      className="w-[220px] h-[340px] p-3 rounded-lg overflow-hidden relative group shadow-sm hover:shadow bg-white cursor-pointer"
      onClick={handleEditProduct}
    >
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
    </div>
  );
};

export default EditableProductCard;
