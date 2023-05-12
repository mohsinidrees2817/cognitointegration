import React from "react";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../layout";
import Innerlayout from "../layout/Innerlayout";
import Inputbox from "../common/Inputbox";
import Button from "../common/Button";
const Requestcode = () => {
  return (
    <Layout>
      <Innerlayout
        heading={"Verify Email"}
        subheading="An email with a verification link will be sent to your email address for confirmation."
      >
        <Inputbox type="email" placeholder="Email*" required />
        <Button
          actiontype={"Send Link"}
          action={() => {
            console.log("scdcscsdcs");
          }}
        />
      </Innerlayout>
    </Layout>
  );
};

export default Requestcode;
