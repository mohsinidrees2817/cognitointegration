import React, { useState, useEffect, useContext } from "react";
import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserPool,
} from "amazon-cognito-identity-js";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../layout";
import Innerlayout from "../layout/Innerlayout";
import Inputbox from "../common/Inputbox";
import Button from "../common/Button";
import UserPool from "./UserPool";
import { Headercontext } from "../Maincontext/HeaderData";
import { createImageFromInitials } from "../ImageCreation/createImage";
import { getRandomColor } from "../ImageCreation/getrandomcolor";
import SocialButton from "./SocialButton";
import "react-toastify/dist/ReactToastify.css";
import Error from "../common/Error";
import Passwordbox from "../common/Passwordbox";
const Login = () => {
  const {
    setUserDetails,
    setToken,
    setToastMessage,
    setConfirmUser,
    confirmUser,
    setUserid,
    verifyJwtFromserver,
  } = useContext(Headercontext);
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState({
    isError: false,
    message: "",
  });
  const [confirmCode, setConfirmCode] = useState("");

  useEffect(() => {
    setError({
      isError: false,
      message: "",
    });
  }, [email, password, confirmCode]);

  var AmazonCognitoIdentity = require("amazon-cognito-identity-js");
  const userPool = new CognitoUserPool({
    UserPoolId: "ap-northeast-1_ub6BKbCOS",
    ClientId: "40l4r3ri3b721utkclttqju4j8",
  });
  const onSubmit = (e) => {
    e.preventDefault();

    const user = new CognitoUser({
      Username: email,
      Pool: UserPool,
    });

    const authDetails = new AuthenticationDetails({
      email: email,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (data) => {
        console.log(data.accessToken.jwtToken, " accesstoken");
        let userData = {
          username: data.idToken.payload.name,
          userEmail: data.idToken.payload.email,
          picture: createImageFromInitials(
            500,
            data.idToken.payload.name,
            getRandomColor()
          ),
          userId: data.accessToken.payload.client_id,
          expTime: data.accessToken.payload.exp,
          alldata: data,
        };
        verifyJwtFromserver(data.accessToken.jwtToken);
        setUserDetails(userData);
        setToken(data.accessToken.jwtToken);
        setUserid(data.accessToken.payload.client_id);
        localStorage.setItem("user_ID", data.accessToken.payload.client_id);
        localStorage.setItem("user_details", JSON.stringify(userData));
        localStorage.setItem("token", data.accessToken.jwtToken);
        setToastMessage({
          display: true,
          message: "Logged in successfully",
        });
        navigate("/");
      },
      onFailure: (err) => {
        if (err.message == "User is not confirmed.") {
          navigate("/verify");
        } else {
          setError({
            isError: true,
            message: err.message || JSON.stringify(err),
          });
        }
      },
      newPasswordRequired: (data) => {},
    });
  };

  return (
    <Layout>
      <Innerlayout heading={"Sign In"} onSubmit={(e) => onSubmit(e)}>
        <div className="socialbuttons">
          <SocialButton />
        </div>
        <div className="divider">or login with email</div>

        <Inputbox
          type="email"
          placeholder="Enter your email"
          required
          heading="Email*"
          handlechange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Passwordbox
          placeholder="******"
          required
          heading="Password*"
          handlechange={(e) => {
            setPassword(e.target.value);
          }}
        />
        {error.isError && <Error errormessage={error.message} />}
        <Button actiontype={"Sign In"} />
        <Link to="/forgotpassword">
          <p className="link-page">Forgot Password?</p>
        </Link>
        <Link to="/signup">
          <p className="simpletext">
            Dont't have an account? <span className="link-page">Signup</span>
          </p>
        </Link>
      </Innerlayout>
    </Layout>
  );
};

export default Login;
