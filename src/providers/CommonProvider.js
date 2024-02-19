import React, { useState } from "react";
import CommonContext from "../contexts/CommonContext";

const CommonProvider = ({ children }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [text, setText] = useState(null);
  const [status, setStatus] = useState(null);
  const [buttonText, setButtonText] = useState(null);
  const [onClick, setOnClick] = useState(null);
  const values = {
    text,
    status,
    onClick,
    isSuccess,
    buttonText,
    setText,
    setStatus,
    setOnClick,
    setIsSuccess,
    setButtonText,
  };
  return (
    <CommonContext.Provider value={values}>{children}</CommonContext.Provider>
  );
};

export default CommonProvider;
