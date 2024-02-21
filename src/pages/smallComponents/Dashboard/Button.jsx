import React from "react";

const Button = ({ classNames, type, text, onClick }) => {
  return (
    <button type={type} onClick={onClick} className={classNames}>
      {text}
    </button>
  );
};

export default Button;
