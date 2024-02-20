import React from "react";
import Button from "./Button";

const PromoCode = ({ promoCode }) => {
  const activeButtonClassNames =
    "bg-[#FFFEE1] text-[#7A4100] px-8 rounded-3xl font-semibold py-2.5";
  const deActiveButtonClassNames =
    "bg-[#FFE1E1] text-[#FF3D57]  px-8 rounded-3xl font-semibold py-2.5";
  const editButtonClassNames =
    "bg-[#FFF700] px-12 rounded-3xl font-semibold py-2.5";
  //   const handleDelete = () => {
  //     handleDeleteItem(item._id);
  //   };
  const createdAtDate = new Date(promoCode?.createdAt);
  const startDate = new Date(promoCode?.startDate);
  const endDate = new Date(promoCode?.endDate);
  const formattedCreatedAt = createdAtDate.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });
  const formattedStartDate = startDate.toLocaleString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });
  const formattedEndDate = endDate.toLocaleString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="flex flex-col justify-start items-center rounded-xl shadow-sm bg-white w-[calc(100%-40px)]">
      <div className="flex justify-between items-center w-full border-b">
        <div className="font-semibold flex gap-16 px-6 py-3.5">
          <p>1</p>
          <p>{promoCode?.promoCode.toUpperCase()}</p>
        </div>
        <div className="flex gap-5 items-center px-6 py-3.5">
          <Button text="Edit" classNames={editButtonClassNames} />
          <Button
            text={promoCode?.status ? "Deactive" : "Active"}
            classNames={
              promoCode?.status
                ? deActiveButtonClassNames
                : activeButtonClassNames
            }
          />
        </div>
      </div>
      <div className="px-6 py-5 font-semibold flex items-center justify-between w-full">
        <div>
          <p>
            Created at: {formattedCreatedAt.split(",")[1]},{" "}
            {formattedCreatedAt.split(",")[0]}
          </p>
        </div>
        <div>
          <p>Usages: {promoCode?.usageCount}</p>
        </div>
        <div>
          <p>Discount Rate: {promoCode?.discountRate}%</p>
        </div>
        <div>
          <p>Start Date: {formattedStartDate}</p>
        </div>
        <div>
          <p>End Date: {formattedEndDate}</p>
        </div>
      </div>
    </div>
  );
};

export default PromoCode;
