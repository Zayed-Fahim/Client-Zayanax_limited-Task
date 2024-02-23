import React, { useContext } from "react";
import tick from "../../assets/icon/check.png";
import CommonContext from "../../contexts/CommonContext";
import Button from "../smallComponents/Dashboard/Button";

const ConfirmationMessage = ({
  text,
  status,
  buttonText,
  classNames,
  type,
}) => {
  const { setIsSuccess } = useContext(CommonContext);

  return (
    <div className="h-[100vh] w-full flex justify-center pt-60 bg-[#848484]">
      <div className="bg-white w-[280px] h-[220px] rounded-lg flex flex-col justify-center items-center gap-3 font-semibold">
        <img loading="lazy" className="h-8 w-8" src={tick} alt="" />
        <div className="flex flex-col justify-center items-center">
          <p>{text}</p>
          <p>{status}</p>
        </div>

        <Button
          type={type}
          onClick={() => {
            window.location.href = "/auth/admin-panel";
            setIsSuccess(false);
          }}
          text={buttonText}
          classNames={classNames}
        />
      </div>
    </div>
  );
};

export default ConfirmationMessage;
