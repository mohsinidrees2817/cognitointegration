import React, { useState, useEffect, useContext } from "react";
import { CognitoUser } from "amazon-cognito-identity-js";
import { Headercontext } from "../Maincontext/HeaderData";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../layout";
import Innerlayout from "../layout/Innerlayout";
import Inputbox from "../common/Inputbox";
import Button from "../common/Button";
import { Link, useNavigate } from "react-router-dom";
import UserPool from "./UserPool";
import Passwordbox from "../common/Passwordbox";
import Error from "../common/Error";
const ForgotPassword = () => {
  const navigate = useNavigate();

  const { setForgetPassword, setToastMessage } = useContext(Headercontext);

  const [email, setEmail] = useState("");
  const [newPassword, setNewpassword] = useState("");
  const [confirmPassword, setConfirmpassword] = useState("");
  const [isVerifyCode, setIsverifycode] = useState(false);
  const [verificationCode, setVerificationcode] = useState("");

  const [error, setError] = useState({
    isError: false,
    message: "",
  });

  useEffect(() => {
    setError({
      isError: false,
      message: "",
    });
  }, [email, newPassword, confirmPassword, verificationCode]);

  const onSubmit = (e) => {
    e.preventDefault();
    const user = new CognitoUser({
      Username: email,
      Pool: UserPool,
    });

    if (!isVerifyCode) {
      user.forgotPassword({
        onSuccess: function (result) {
          console.log("call result: " + result);
        },
        onFailure: function (err) {
          console.log(err);
          setError({
            isError: true,
            message: err.message || JSON.stringify(err),
          });
        },
        inputVerificationCode: (data) => {
          console.log("Input code:", data);
          setIsverifycode(true);
        },
      });
    } else {
      if (confirmPassword == newPassword) {
        user.confirmPassword(verificationCode, newPassword, {
          onSuccess: (data) => {
            console.log("onSuccess:", data);
            setToastMessage({
              display: true,
              message: "password updated succesfully",
            });
            setForgetPassword(false);
            navigate("/signin");
          },
          onFailure: (err) => {
            setError({
              isError: true,
              message: err.message || JSON.stringify(err),
            });
          },
        });
      } else {
        setError({
          isError: true,
          message: "Password and confirmed password are diffferent",
        });
      }
    }
  };

  return (
    <Layout>
      {!isVerifyCode && (
        <Innerlayout
          heading={"Forgot Password"}
          subheading="An email with a link will be sent to your email address to change password."
          onSubmit={(e) => onSubmit(e)}
        >
          <Inputbox
            type="email"
            placeholder="Enter your email"
            required
            heading="Email*"
            handlechange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Button actiontype={"Forgot Password"} type="submit" />
          <div>
            <p className="simpletext">Have you remembered your password</p>
            <Link to="/signin">
              <p className="forgot-password">Sign In</p>
            </Link>
          </div>
        </Innerlayout>
      )}
      {isVerifyCode && (
        <Innerlayout
          heading={"Set Password"}
          subheading="Enter a code sent to your email and add new password."
          onSubmit={(e) => {
            onSubmit(e);
          }}
        >
          <Inputbox
            type="text"
            placeholder="000000"
            required
            heading="Code"
            handlechange={(e) => {
              setVerificationcode(e.target.value);
            }}
          />
          <Passwordbox
            placeholder="********"
            required
            heading="Password"
            handlechange={(e) => {
              setNewpassword(e.target.value);
            }}
          />
          <Passwordbox
            placeholder="********"
            required
            heading="Repeat Password"
            handlechange={(e) => {
              setConfirmpassword(e.target.value);
            }}
          />
          {error.isError && <Error errormessage={error.message} />}

          <Button actiontype={"Set Password"} />
        </Innerlayout>
      )}
    </Layout>
  );
};

export default ForgotPassword;
