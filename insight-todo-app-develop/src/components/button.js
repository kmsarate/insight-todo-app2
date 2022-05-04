import React from "react";

const Button = (props) => {
  const { label, type, handleClick, className } = props;
  return (
    <button onClick={handleClick} type={type} className={className}
    >
      {label}
    </button>
  );
};

export default Button
