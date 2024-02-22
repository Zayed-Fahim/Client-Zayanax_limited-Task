import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../reuseableComponents/Button";
import DataFetchingLoader from "../../reuseableComponents/DataFetchingLoader";
import EditableProductCard from "../../reuseableComponents/EditableProductCard";
import CommonContext from "../../../contexts/CommonContext";

const ProductsPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { setIsProductEditing, setProduct } = useContext(CommonContext);
  const addProductClassNames =
    "font-semibold bg-white w-max px-7 drop-shadow py-2 rounded-3xl";

  useEffect(() => {
    setIsLoading(true);
    const fetchedProducts = async () => {
      const response = await axios.get(
        "https://server-zayanax-limited-task.vercel.app/api/v1/products"
      );
      if (response.status === 200) {
        setProducts(response.data.payload);
        setTimeout(() => setIsLoading(false), 1500);
      }
    };
    fetchedProducts();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    try {
      const filteredProducts = products.filter(
        (product) => product.status === true
      );
      setFilteredProducts(filteredProducts);
      setTimeout(() => setIsLoading(false), 1500);
    } catch (error) {
      console.log(error.message);
    }
  }, [products]);

  return (
    <div className="flex flex-col gap-5 px-10 py-5 w-5/6 h-full">
      <Button
        onClick={() => {
          setIsProductEditing(false);
          setProduct(null);
          navigate("/dashboard/products/add-new-product");
        }}
        type={"button"}
        classNames={addProductClassNames}
        text={"Add New Product"}
      />
      {isLoading ? (
        <DataFetchingLoader />
      ) : (
        <div className="grid xl:grid-cols-6 gap-x-5 gap-y-10 h-max w-full">
          {filteredProducts?.map((product, index) => (
            <EditableProductCard key={index} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
