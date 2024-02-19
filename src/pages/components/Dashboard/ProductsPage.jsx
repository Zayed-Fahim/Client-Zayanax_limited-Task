import React, { useEffect, useState } from "react";
import Button from "../../reuseableComponents/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProductCard from "../../reuseableComponents/ProductCard";
import DataFetchingLoader from "../../reuseableComponents/DataFetchingLoader";

const ProductsPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const addProductClassNames =
    "font-semibold bg-white w-max px-7 drop-shadow py-2 rounded-3xl";

  useEffect(() => {
    setIsLoading(true);
    const fetchedProducts = async () => {
      const response = await axios.get("http://localhost:8080/api/v1/products");
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
    <div className="flex flex-col gap-5 px-10 py-5 w-full h-full">
      <Button
        onClick={() => navigate("/dashboard/products/add-new-products")}
        type={"button"}
        classNames={addProductClassNames}
        text={"Add New Product"}
      />
      {isLoading ? (
        <DataFetchingLoader />
      ) : (
        <div className="grid xl:grid-cols-6 gap-x-8 gap-y-10 h-max w-full">
          {filteredProducts?.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
