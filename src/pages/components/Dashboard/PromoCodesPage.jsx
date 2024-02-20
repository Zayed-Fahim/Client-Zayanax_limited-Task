import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../reuseableComponents/Button";
import DataFetchingLoader from "../../reuseableComponents/DataFetchingLoader";
import PromoCode from "../../reuseableComponents/PromoCode";

const PromoCodesPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [promoCodes, setPromoCodes] = useState([]);
  const addPromoCodeClassNames =
    "font-semibold bg-white w-max px-7 drop-shadow py-2 rounded-3xl";

  useEffect(() => {
    setIsLoading(true);
    const fetchedProducts = async () => {
      const response = await axios.get(
        "http://localhost:8080/api/v1/promo-code"
      );
      if (response.status === 200) {
        setPromoCodes(response.data.payload);
        setTimeout(() => setIsLoading(false), 1500);
      }
    };
    fetchedProducts();
  }, []);

  return (
    <div className="flex flex-col gap-5 px-10 py-5 w-5/6 h-full">
      <Button
        onClick={() => navigate("/dashboard/promotion/add-new-promo-code")}
        type={"button"}
        classNames={addPromoCodeClassNames}
        text={"Add New Promo"}
      />
      {isLoading ? (
        <DataFetchingLoader />
      ) : (
        <div className="flex flex-col gap-y-10 h-max w-full">
          {promoCodes?.map((promoCode, index) => (
            <PromoCode key={index} promoCode={promoCode} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PromoCodesPage;
