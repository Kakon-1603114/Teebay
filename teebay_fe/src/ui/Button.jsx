import React from "react";

const Button = ({ text, classname, onclick, disabled }) => {
  return (
    // Button component
    <button
      disabled={disabled}
      onClick={onclick}
      className={classname}>
      {text}
    </button>
  );
};

export default Button;
