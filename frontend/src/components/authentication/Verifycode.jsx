import React from "react";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../layout";
import Innerlayout from "../layout/Innerlayout";
import { Link } from "react-router-dom";
const Verifycode = () => {
  return (
    <Layout>
      <Innerlayout
        heading={"Verify Email"}
        subheading="An email with a verification link sent to your email address for confirmation."
      >
        <Link to={"/signin"}>
          <p className="link-page">Done? Proceed to login</p>
        </Link>
      </Innerlayout>
    </Layout>
  );
};

export default Verifycode;
