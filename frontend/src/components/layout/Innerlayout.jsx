import React from "react";

const Innerlayout = ({ children, heading, subheading, onSubmit, ...props }) => {
  return (
    <div className="innerlayout" onSubmit={onSubmit}>
      <form className="innerlayout-main">
        <div>
          <h1 className="page-heading">{heading}</h1>
          <h1 className="page-subheading">{subheading}</h1>
        </div>
        {children}
      </form>
    </div>
  );
};

export default Innerlayout;
