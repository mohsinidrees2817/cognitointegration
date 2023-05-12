import React from "react";

const Error = ({ errormessage }) => {
  return (
    <div className="error-container ">
      <div className="error-message">
        <svg
          width="15px"
          height="15px"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.5 16V14.5M12.5 9V13M20.5 12.5C20.5 16.9183 16.9183 20.5 12.5 20.5C8.08172 20.5 4.5 16.9183 4.5 12.5C4.5 8.08172 8.08172 4.5 12.5 4.5C16.9183 4.5 20.5 8.08172 20.5 12.5Z"
            stroke="#121923"
          />
        </svg>
        <p className="">{errormessage}</p>
      </div>
    </div>
  );
};

export default Error;
