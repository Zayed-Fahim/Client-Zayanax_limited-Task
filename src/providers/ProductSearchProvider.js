import React, { useState } from "react";
import ProductSearchContext from "../contexts/ProductSearchContext";
import axios from "axios";

const ProductSearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const handleSearchChange = async (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);

    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/products/search?search=${newSearchTerm}`
      );
      setSearchResults(response?.data?.payload);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };
  const values = {
    searchTerm,
    searchResults,
    handleSearchChange,
  };
  return (
    <ProductSearchContext.Provider value={values}>
      {children}
    </ProductSearchContext.Provider>
  );
};

export default ProductSearchProvider;
