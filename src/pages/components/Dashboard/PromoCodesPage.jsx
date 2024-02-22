import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CommonContext from "../../../contexts/CommonContext";
import PromoCodeContext from "../../../contexts/PromoCodeContext";
import Button from "../../reuseableComponents/Button";
import DataFetchingLoader from "../../reuseableComponents/DataFetchingLoader";
import PromoCode from "../../reuseableComponents/PromoCode";

const PromoCodesPage = () => {
  const navigate = useNavigate();
  const { setPromoCode, setIsPromoCodeEditing } = useContext(CommonContext);
  const { isLoading, promoCodes, fetchedPromoCodes } =
    useContext(PromoCodeContext);
    
  const addPromoCodeClassNames =
    "font-semibold bg-white w-max px-7 drop-shadow py-2 rounded-3xl";

  useEffect(() => {
    fetchedPromoCodes();
  }, [fetchedPromoCodes]);

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
