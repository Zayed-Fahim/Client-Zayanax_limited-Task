import React, { useContext, useEffect, useState } from "react";
import ProductCard from "../../reuseableComponents/ProductCard";
import axios from "axios";
import DataFetchingLoader from "../../reuseableComponents/DataFetchingLoader";
import ProductSearchContext from "../../../contexts/ProductSearchContext";

const Products = () => {
  const { searchResults, searchTerm } = useContext(ProductSearchContext);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const fetchedProducts = async () => {
      try {
        const response = await axios.get(
          "https://server-zayanax-limited-task.vercel.app/api/v1/products"
        );
        if (response.status === 200) {
          setProducts(response.data.payload);
          setTimeout(() => setIsLoading(false), 1500);
        }
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
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
      setIsLoading(false);
    }
  }, [products]);

  return (
    <div className="w-full h-full relative">
      {isLoading ? (
        <DataFetchingLoader />
      ) : (
        <div
          className={`${
            searchResults.length === 0 && searchTerm !== ""
              ? "h-full w-full"
              : "grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 md:gap-x-5 xl:gap-x-5 gap-y-10 h-auto w-auto"
          }`}
        >
          {(searchTerm === "" ? filteredProducts : searchResults)?.map(
            (product, index) => (
              <ProductCard key={index} product={product} />
            )
          )}
          {searchResults.length === 0 &&
            filteredProducts.length !== 0 &&
            searchTerm !== "" && (
              <p className="text-center font-bold">No products found!</p>
            )}
        </div>
      )}
    </div>
  );
};

export default Products;
