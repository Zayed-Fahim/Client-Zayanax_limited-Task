import axios from "axios";
import React, { useCallback, useState } from "react";
import PromoCodeContext from "../contexts/PromoCodeContext";

const PromoCodeProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [promoCodes, setPromoCodes] = useState([]);

  const fetchedPromoCodes = useCallback(async () => {
    setIsLoading(true);
    const response = await axios.get(
      "https://server-zayanax-limited-task.vercel.app/api/v1/promo-code"
    );
    if (response.status === 200) {
      setPromoCodes(response?.data?.payload);
      setTimeout(() => setIsLoading(false), 1500);
    }
  }, []);
  const values = {
    isLoading,
    promoCodes,
    setIsLoading,
    fetchedPromoCodes,
  };
  return (
    <PromoCodeContext.Provider value={values}>
      {children}
    </PromoCodeContext.Provider>
  );
};

export default PromoCodeProvider;
