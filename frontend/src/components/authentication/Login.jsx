import React, { useState, useEffect, useContext } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../layout";
import Innerlayout from "../layout/Innerlayout";
import Inputbox from "../common/Inputbox";
import Button from "../common/Button";
import { userPool } from "../../config/cognito";
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

  useEffect(() => {
    setError({
      isError: false,
      message: "",
    });
  }, [email, password]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const user = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    const authDetails = new AuthenticationDetails({
      email: email,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: async (data) => {
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
        const response = await verifyJwtFromserver(data.accessToken.jwtToken);
        if (response !== null && response !== undefined) {
          setUserDetails(userData);
          setToken(data.accessToken.jwtToken);
          setUserid(data.accessToken.payload.client_id);
          localStorage.setItem("user_ID", data.accessToken.payload.client_id);
          localStorage.setItem("user_details", JSON.stringify(userData));
          localStorage.setItem("token", data.accessToken.jwtToken);
          navigate("/");
        } else {
          console.log("invalid jwt token");
          alert("fail to login try again later");
          localStorage.clear();
          navigate("/signin");
        }
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
