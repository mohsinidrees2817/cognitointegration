import React from "react";

const InputBox = ({ heading, handlechange, ...props }) => {
  return (
    <div className="input-container">
      <label htmlFor="InputBox" className="input-heading">
        {heading}
      </label>
      <input {...props}  className="InputBox" onChange={handlechange} />
    </div>
  );
};

export default InputBox;
