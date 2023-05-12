import React from "react";
import Innerlayout from "./Innerlayout";
const index = ({ children, ...props }) => {
  return <div className="maincontainer">{children}</div>;
};

export default index;
