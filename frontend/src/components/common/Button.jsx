import React from "react";

const Button = ({ actiontype, action }) => {
  return (
    <>
      <button className="submit-button" type="submit" onClick={action}>
        {actiontype}
        </button>
    </>
  );
};

export default Button;
