import React, { useCallback, useState } from "react";
import ProductContext from "../contexts/ProductContext";
import axios from "axios";

const ProductProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchedProducts = useCallback(async () => {
    setIsLoading(true);
    const response = await axios.get(
      "https://server-zayanax-limited-task.vercel.app/api/v1/products"
    );
    if (response.status === 200) {
      setProducts(response?.data?.payload);
      setTimeout(() => setIsLoading(false), 1500);
    }
  }, []);
  const values = {
    products,
    isLoading,
    setIsLoading,
    fetchedProducts,
  };
  return (
    <ProductContext.Provider value={values}>{children}</ProductContext.Provider>
  );
};

export default ProductProvider;
