import React, { useContext, useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { CognitoAuth } from "amazon-cognito-auth-js";
import axios from "axios";

export const Headercontext = createContext();

const HeaderData = ({ children }) => {
  const navigate = useNavigate();
  const [userID, setUserid] = useState("");
  const [comfirmLoader, setConfirmLoader] = useState(false);

  // states for displaying popups
  const [forgetPassword, setForgetPassword] = useState(false);
  const [confirmUser, setConfirmUser] = useState(false);

  // react toast notification
  const [toastmessage, setToastMessage] = useState({
    display: false,
    message: "",
  });

  // loader for social icons
  const [googleLoader, setGoogleloader] = useState(false);
  const [facebookLoader, setFacebookloader] = useState(false);

  const [token, setToken] = useState(null);
  const [userDetails, setUserDetails] = useState({});

  // make a request to the server and include the authorization header
  const verifyJwtFromserver = async (jwttoken) => {
    const API_URL = "http://localhost:4000";
    try {
      const response = await axios.get(`${API_URL}/verify`, {
        headers: {
          Authorization: `Bearer ${jwttoken}`,
        },
      });
      console.log(response.data);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log("error!", message);
    }
  };

  // function to check is user logged in or not
  const IsloggedIn = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      // verifying token on each login that is there is valid token in local storage or not
      const response = await verifyJwtFromserver(token);
      if (response) {
        console.log(response, "response");
        const userDetails = JSON.parse(localStorage.getItem("user_details"));
        const ID = localStorage.getItem("user_ID");
        token && setToken(token);
        userDetails && setUserDetails(userDetails);
        ID && setUserid(ID);
        console.log("User already logged in");
      } else {
        console.log("user have invalid/expired token token");
        alert("Invalid token in local storage");
        localStorage.clear();
        navigate("/signin");
      }
    } else {
      console.log("user not logged in");
    }
  };

  useEffect(() => {
    IsloggedIn();
  }, []);

  return (
    <Headercontext.Provider
      value={{
        token,
        setToken,
        userDetails,
        setUserDetails,
        forgetPassword,
        setForgetPassword,
        toastmessage,
        setToastMessage,
        googleLoader,
        setGoogleloader,
        facebookLoader,
        setFacebookloader,
        confirmUser,
        setConfirmUser,
        userID,
        setUserid,
        verifyJwtFromserver,
        setConfirmLoader,
        comfirmLoader,
        verifyJwtFromserver,
      }}
    >
      {children}
    </Headercontext.Provider>
  );
};

export default HeaderData;
