import React, { useEffect, useState } from "react";
import ProductCard from "../../reuseableComponents/ProductCard";
import axios from "axios";
import DataFetchingLoader from "../../reuseableComponents/DataFetchingLoader";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
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
    <div className="w-full h-full">
      {isLoading ? (
        <DataFetchingLoader />
      ) : (
        <div className="grid xl:grid-cols-7 gap-x-5 gap-y-10">
          {filteredProducts?.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
