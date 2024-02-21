import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../reuseableComponents/Button";
import DataFetchingLoader from "../../reuseableComponents/DataFetchingLoader";
import PromoCode from "../../reuseableComponents/PromoCode";
import CommonContext from "../../../contexts/CommonContext";

const PromoCodesPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [promoCodes, setPromoCodes] = useState([]);
  const { setPromoCode, setIsPromoCodeEditing } = useContext(CommonContext);
  const addPromoCodeClassNames =
    "font-semibold bg-white w-max px-7 drop-shadow py-2 rounded-3xl";

  useEffect(() => {
    setIsLoading(true);
    const fetchedPromoCodes = async () => {
      const response = await axios.get(
        "https://server-zayanax-limited-task.vercel.app/api/v1/promo-code"
      );
      if (response.status === 200) {
        setPromoCodes(response.data.payload);
        setTimeout(() => setIsLoading(false), 1500);
      }
    };
    fetchedPromoCodes();
  }, []);

  return (
    <div className="flex flex-col gap-5 px-10 py-5 w-5/6 h-full">
      <Button
        onClick={() => {
          setPromoCode(null);
          setIsPromoCodeEditing(false);
          navigate("/dashboard/promotion/add-new-promo-code");
        }}
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
