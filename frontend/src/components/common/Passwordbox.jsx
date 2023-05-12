import React, { useState } from "react";

const Passwordbox = ({ heading, handlechange, ...props }) => {
  const [passwordIcon, setPasswordIcon] = useState(true);

  return (
    <div className="input-container">
      <label htmlFor="InputBox" className="input-heading">
        {heading}
      </label>
      <input
        {...props}
        className="InputBox"
        type={passwordIcon ? "password" : "text"}
        onChange={handlechange}
      />
      <div
        className="passwordIcon"
        onClick={() => setPasswordIcon(!passwordIcon)}
      >
        {passwordIcon ? (
          <img
            src="../assets/icon/show.png"
            alt=""
            className="opacity-80"
            width={20}
          />
        ) : (
          <img
            src="../assets/icon/hide.png"
            alt=""
            className="opacity-80"
            width={20}
          />
        )}
      </div>
    </div>
  );
};

export default Passwordbox;
