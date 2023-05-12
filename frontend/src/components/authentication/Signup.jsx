import React, { useState, useEffect, useContext } from "react";
import { Headercontext } from "../Maincontext/HeaderData";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../layout";
import Innerlayout from "../layout/Innerlayout";
import Inputbox from "../common/Inputbox";
import Error from "../common/Error";
import Passwordbox from "../common/Passwordbox";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const { token, setSignup, setLogin, setToastMessage } =
    useContext(Headercontext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const [name, setName] = useState("");
  const [error, setError] = useState({
    isError: false,
    message: "",
  });

  var AmazonCognitoIdentity = require("amazon-cognito-identity-js");

  useEffect(() => {
    setError({
      isError: false,
      message: "",
    });
  }, [email, password, name, confirmpassword]);

  const poolData = {
    UserPoolId: "ap-northeast-1_ZpGAnFl7V",
    ClientId: "7c3np67ouk443m5mmer7ajmi2",
  };

  var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  var attributeList = [];

  var dataEmail = {
    Name: "email",
    Value: email,
  };

  var dataName = {
    Name: "name",
    Value: name,
  };

  var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(
    dataEmail
  );

  var attributeName = new AmazonCognitoIdentity.CognitoUserAttribute(dataName);

  attributeList.push(attributeEmail);
  attributeList.push(attributeName);

  const onSubmit = (e) => {
    e.preventDefault();
    if (password != confirmpassword) {
      setError({
        isError: true,
        message: "Passwords do not match",
      });
    } else {
      userPool.signUp(
        email,
        password,
        attributeList,
        null,
        function (err, result) {
          if (err) {
            setError({
              isError: true,
              message: err.message || JSON.stringify(err),
            });
            return;
          }
          setError({
            isError: false,
            message: "",
          });
          navigate("/verify");
        }
      );
    }
  };

  return (
    <Layout>
      <Innerlayout heading={"Sign up"} onSubmit={(e) => onSubmit(e)}>
        <Inputbox
          type="email"
          placeholder="Email*"
          required
          handlechange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Inputbox
          type="text"
          placeholder="Name"
          handlechange={(e) => {
            setName(e.target.value);
          }}
        />
        <Passwordbox
          placeholder="Password*"
          required
          handlechange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Passwordbox
          placeholder="Confirm Passsword*"
          required
          handlechange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
        {error.isError && <Error errormessage={error.message} />}
        <div className="Signup-buttons">
          <Link to="/">
            <div className="signup-cancel">CANCEL</div>
          </Link>

          <button className="signup-button" type="submit">
            SIGN UP
          </button>
        </div>
      </Innerlayout>
    </Layout>
  );
};

export default Signup;
